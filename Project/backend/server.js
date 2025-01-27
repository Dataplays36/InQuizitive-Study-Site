const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'sql207.infinityfree.com',
  user: 'if0_38190243',
  password: ' BM4gQ17Qps8UAva ',
  database: 'if0_38190243_study_site'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: result.insertId, username, email });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
