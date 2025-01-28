require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('MySQL Connected...');
});

// Middleware
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
  res.send('API is working');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
