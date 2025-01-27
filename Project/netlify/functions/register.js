const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

exports.handler = async function(event, context) {
  const { username, email, password } = JSON.parse(event.body);
  const sql = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(sql, [username, email, password], (err, result) => {
      if (err) {
        return reject({
          statusCode: 500,
          body: JSON.stringify({ message: err.message })
        });
      }
      resolve({
        statusCode: 201,
        body: JSON.stringify({ id: result.insertId, username, email })
      });
