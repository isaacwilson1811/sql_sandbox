const express = require('express');
const sqlite3 = require('sqlite3');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Ensure the 'sessions' directory exists (create it manually or programmatically)
const sessionDirectory = path.join(__dirname, 'sessions');

// Session store setup
app.use(session({
  store: new FileStore({
    path: sessionDirectory,  // Path to the sessions folder
    ttl: 86400,              // Session TTL (in seconds)
    retries: 2,              // Retries on failure
  }),
  secret: 'your-secret-key',  // Secret for session encryption
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set to `true` if you're using HTTPS
}));

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to handle the creation of an in-memory DB for each session
app.use((req, res, next) => {
  // Only create the in-memory DB if it doesn't exist in the session
  if (!req.session.db) {
    console.log('Creating new in-memory database for session...');
    const memoryDb = new sqlite3.Database(':memory:');
    req.session.db = memoryDb;

    // Create the necessary tables for each user session
    req.session.db.serialize(() => {
      req.session.db.run('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, name TEXT)');
      req.session.db.run('CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, name TEXT, position TEXT)');
      req.session.db.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, customer_id INTEGER, order_date TEXT)');
    });

    console.log('In-memory database created and stored in session.');
  } else {
    console.log('Using existing in-memory database for this session.');
  }

  // Log the current state of the database instance
  console.log('Current session.db:', req.session.db);

  next();
});

// Example route to run queries (GET or POST)
app.post('/query', (req, res) => {
  const query = req.body.query;  // Get the SQL query from the request body

  if (req.session.db && query) {
    console.log(`Executing query: ${query}`);

    // Log the type of req.session.db to ensure it's an instance of sqlite3.Database
    if (req.session.db instanceof sqlite3.Database) {
      console.log('Database instance confirmed');
      req.session.db.all(query, (err, rows) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Query execution failed', message: err.message });
        }
        res.json({ data: rows });
      });
    } else {
      console.error('Database instance not found');
      return res.status(500).json({ error: 'Invalid database instance' });
    }
  } else {
    return res.status(400).json({ error: 'No database or query provided' });
  }
});

// Example route to insert data into the customers table
app.post('/insert-customer', (req, res) => {
  const { name } = req.body;
  if (req.session.db && name) {
    req.session.db.run('INSERT INTO customers (name) VALUES (?)', [name], function (err) {
      if (err) {
        console.error('Error inserting data into table:', err);
        return res.status(500).json({ error: 'Failed to insert data', message: err.message });
      }
      res.json({ message: 'Customer added successfully', id: this.lastID });
    });
  } else {
    return res.status(400).json({ error: 'No database or customer data provided' });
  }
});

// Route to close the session's database (optional)
app.post('/close-db', (req, res) => {
  if (req.session.db) {
    req.session.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
        return res.status(500).json({ error: 'Failed to close database', message: err.message });
      }
      res.json({ message: 'Database connection closed' });
    });
  } else {
    res.status(400).json({ error: 'No database connection to close' });
  }
});

app.use('/', express.static('front_end'))
// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
