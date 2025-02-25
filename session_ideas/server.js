// Import Required Node Modules
const express = require('express')
const session = require('express-session')
const sqlite3 = require('sqlite3')

// Setup Express
const port = 3000;
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Serve GUI web page from the front_end DIR
app.use('/', express.static('front_end'))

// Session Setup
app.use(session({
  secret: 'sql_sandbox',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Connect to main database file
const mainDb = new sqlite3.Database('./w3schools.db', (err) => {
  if (err) {
    console.error('Error opening w3schools database:', err)
  }
});

// Create an in-memory database for each user session
app.use((req, res, next) => {
  if (!req.session.db) {
    const memoryDb = new sqlite3.Database(':memory:')
    // Copy schema and data from the main DB to the in-memory DB
    mainDb.serialize(() => {
      mainDb.all('SELECT name FROM sqlite_master WHERE type="table"', (err, tables) => {
        if (err) {
          console.error('Error fetching tables:', err)
          return
        }
        // For each table in the main database, copy the schema and data to the in-memory DB
        tables.forEach((table) => {
          const tableName = table.name

          // Copy the schema: Create the table in the in-memory DB
          mainDb.get(`SELECT sql FROM sqlite_master WHERE type="table" AND name="${tableName}"`, (err, row) => {
            if (err) {
              console.error(`Error fetching schema for table ${tableName}:`, err)
              return
            }

            // Create the table in the in-memory database using the schema
            memoryDb.run(row.sql, (err) => {
              if (err) {
                console.error(`Error creating table ${tableName}:`, err)
                return
              }

              // Now copy the data from the main DB to the in-memory DB
              mainDb.all(`SELECT * FROM ${tableName}`, (err, rows) => {
                if (err) {
                  console.error(`Error fetching data for table ${tableName}:`, err)
                  return
                }

                // Insert data into the in-memory database
                const columns = Object.keys(rows[0])
                const placeholders = columns.map(() => '?').join(',')
                const insertQuery = `INSERT INTO ${tableName} (${columns.join(',')}) VALUES (${placeholders})`

                // Prepare values for insertion
                rows.forEach((row) => {
                  const values = columns.map((column) => row[column])
                  memoryDb.run(insertQuery, values, (err) => {
                    if (err) {
                      console.error(`Error inserting data into table ${tableName}:`, err)
                    }
                  })
                })
              })
            })
          })
        })
      })
    })
    // Store the in-memory DB in the session
    req.session.db = memoryDb
  }
  // Make sure to provide access to the in-memory DB
  req.db = req.session.db
  next()
});


// ---- Endpoints ----

// FUNCTION TO EXEC QUERY
function execQuery(sessiondb, query, callback) {
  let db = sessiondb
  // For SELECT queries, we can return the result set
  if (query.trim().toUpperCase().startsWith('SELECT')) {
      db.all(query, (err, rows) => {
          if (err) {
              return callback(err);
          }
          callback(null, rows);  // Return rows for SELECT queries
      });
  } else {
      db.exec(query, (err) => {
          if (err) {
              return callback(err);
          }
          callback(null, 'Query executed successfully');
      });
  }
}

// app.post('/execute-query', (req, res) => {
//   const query = req.body.query;  // Get the SQL query from the request body
//   // Check for Missing Query
//   if (!query) { return res.status(400).json({ error: 'No SQL query provided' }) }
//   // Execute the query using the db.execQuery function
//   execQuery(req.db, query, (err, result) => {
//       if (err) {
//           return res.status(500).json({ error: 'Failed to execute query', details: err.message });
//       }
//       res.json({ message: result });
//   });
// });
// ------ wip


// Example query endpoint
app.post('/execute-query', (req, res) => {
  const query = req.body.query
  if (!query) { return res.status(400).json({ error: 'No SQL query provided' }) }
  // Execute the query on the in-memory DB for this session
  req.db.all(query, [], (err, result) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).json({ error: 'Query execution failed' })
    }
    res.json({ message: result });
  })
});

// Handle session cleanup when session ends
app.use((req, res, next) => {
  res.on('finish', () => {
    // Check if the session is ending
    if (req.session.db) {
      // Session destruction will handle cleanup
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err)
        }
      })
    }
  })
  next()
})



// Start the server process
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});
