require('dotenv').config();  // Load environment variables from .env file
console.log("database username" + process.env.DB_HOST);
console.log('Current Working Directory:', process.cwd());


const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const bodyParser = require('body-parser'); 
const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

//middleware to parse JSON 
app.use(bodyParser.json());
// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('MySQL Connected...');
});

// Route to handle adding an item
app.post('/add-item', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO user_credentials (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error inserting user credentials:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json({ message: 'User credentials added successfully', userId: results.insertId });
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server started successfully on port: ${port}`);
});



