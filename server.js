//Use Express Module
const express = require('express');
const app = express();


//Import w3schools db
const defaultDB = require('./restore');

//Import db functions
const db = require('./rdbms');

// Serve GUI web page from the front_end DIR
app.use('/', express.static('front_end'))
// Middleware to parse JSON request bodies
app.use(express.json());

// RESTORE THE DB ON STARTUP
const sqlFilePath = './w3schools.sql';
defaultDB.restoreDatabase(sqlFilePath, (err, message) => {
  if (err) {
      console.error('Error restoring the database:', err.message);
  } else {
      console.log(message);
  }
});

// Route to restore the database from the SQL file Again
app.post('/restore-db', (req, res) => {
  defaultDB.restoreDatabase(sqlFilePath, (err, message) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to restore database', details: err.message });
      }
      res.json({ message });
  });
});


// Route to insert a new user
app.post('/add-user', (req, res) => {
    const { name, age } = req.body;

    // Call the insertUser function from db.js
    db.insertUser(name, age, (err, lastID) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert user' });
        }
        res.json({ message: 'User added successfully', userId: lastID });
    });
});

// Route to get all users
app.get('/users', (req, res) => {
    // Call the getUsers function from db.js
    db.getUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.json({ users });
    });
});



// Route to close the database connection (when you're done with it)
app.post('/close-db', (req, res) => {
    db.closeDatabase();
    res.json({ message: 'Database closed successfully' });
});




// Test route - return the submitted query
// app.post('/api/sql', (req, res) => {
//   console.log(req.body)
//   res.json(req.body);
// });

// just do the exec
// app.post('/api/sql', (req, res) => {
//   console.log(req.body)
//   db.doIt(req.body.query)
//   res.json(req.body);
// });

// Endpoint to execute an arbitrary SQL query
app.post('/execute-query', (req, res) => {
  const query = req.body.query;  // Get the SQL query from the request body

  if (!query) {
      return res.status(400).json({ error: 'No SQL query provided' });
  }

  // Execute the query using the db.execQuery function
  db.execQuery(query, (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to execute query', details: err.message });
      }
      res.json({ message: result });
  });
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});