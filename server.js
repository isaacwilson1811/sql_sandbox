const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use('/', express.static('front_end'))
app.use(express.json());

// Sample data to return in the API response
// let m0 = {
//   text: 'Hello, World!'
// };
// let m1 = {
//     text: 'Another Message'
//   };

// let data = {
//     messages: [m0, m1],
//     status: 'success'
// };

let data = {
    messages: 'Hello',
    status: 'success'
};



// GET route - Fetch data
app.post('/api/sql', (req, res) => {
  console.log(req.body)
  res.json(req.body);
});

// POST route - Create new data (replace message)
// app.post('/api/data', (req, res) => {
//   const { message, status } = req.body; // Get data from the request body
//   if (message) {
//     data = { message, status: status || 'success' }; // Update data
//     res.status(201).json(data); // Return the updated data with a 201 status
//   } else {
//     res.status(400).json({ error: 'Message is required' });
//   }
// });

// // PUT route - Update data (replace the entire object)
// app.put('/api/data', (req, res) => {
//   const { message, status } = req.body;
//   if (message) {
//     data = { message, status: status || 'success' };
//     res.status(200).json(data); // Return the updated data with a 200 status
//   } else {
//     res.status(400).json({ error: 'Message is required' });
//   }
// });

// // DELETE route - Delete data (reset the data)
// app.delete('/api/data', (req, res) => {
//   data = { message: 'Data has been deleted', status: 'deleted' };
//   res.status(200).json(data); // Return a message saying data was deleted
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});