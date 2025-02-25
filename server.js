//Express server
const express = require('express')
const app = express()
app.use(express.json())
// Serve GUI web page from the front_end DIR
app.use('/', express.static('front_end'))

//Import db functions
const db = require('./rdbms')


//---- API Endpoints ----

//Endpoint to fetch list of table names and number of rows in them
app.get('/tables', (req, res) => {
    db.getTables((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed', details: err.message });
        }
        res.json({message: result});
    })
})

// Endpoint to restore the database
app.post('/restore-db', (req, res) => {
    defaultDB.restoreDatabase(sqlFilePath, (err, message) => {
        if (err) { return res.status(500).json({ error: 'Failed to restore database', details: err.message }) }
        res.json({ message })
    })
})

// Endpoint to manually close the database connection
app.post('/close-db', (req, res) => {
    db.closeDatabase()
    res.json({ message: 'Database closed successfully' })
})

// Test Endpoint - just return the submitted query
app.post('/api/test-sql', (req, res) => {
    if (!query) { return res.status(400).json({ error: 'No SQL query provided' }) }
    console.log('Received query:')
    console.log(req.body.query)
    res.json(req.body.query)
})


// Endpoint to execute an arbitrary SQL query
app.post('/execute-query', (req, res) => {
  const query = req.body.query;  // Get the SQL query from the request body
  // Check for Missing Query
  if (!query) { return res.status(400).json({ error: 'No SQL query provided' }) }
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