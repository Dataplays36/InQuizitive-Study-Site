const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pappysunseed1-',
  database: 'study_app'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

app.use(express.json());

// Simple route
app.get('/', (req, res) => {
  res.send('API is working');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="";

