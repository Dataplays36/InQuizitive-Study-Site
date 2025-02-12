/*
~~~~~~~~~~Initialization~~~~~~~~~~
*/
// Change the working directory to the root of the repository
const path = require('path');
process.chdir(path.resolve(__dirname, '../../'));



// Load environment variables from .env file
require('dotenv').config(); 


//Requirements 
const session = require('express-session'); //allows for 'sessions'
const bcrypt = require('bcrypt'); //for password hashing
const express = require('express');  //middle-ware: serves front, handles communication to back 
const mysql = require('mysql2');  //database features


//create instances and constants
const bodyParser = require('body-parser'); 
const app = express();
const port = process.env.PORT || 3001;


// create MySQL Connection from environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  
});


// Use sessions to track user login status
app.use(session({
  secret: process.env.SESSION_SECRET,
  /*
    this will be kept in the environment variables for security pracices, even if we don't really expect any attacks 

    can be thought of as a random seed and a password: 
      ensures constistency by creating a digital signature for the session ID cookie
  */
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set to 'true' when we use HTTPS
}));

/*
// Debugging output to check the current working directory and environment variables
console.log('Current Working Directory:', process.cwd());
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME); 
*/


//middleware to parse JSON communications from front-end 
app.use(bodyParser.json());


/*
~~~~~~~~~~Functions and routes~~~~~~~~~~
*/

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));
/*
  path.join() creates the file path using following parameters 
    __dirname gets current file directory
    '..' navigates back a directory
    'frontend' moves into frontend directory

  result: express serves static files (frontend) from the frontend directory
*/  


// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('MySQL Connected...');
});

// Route to handle adding a new user account
app.post('/add-user', (req, res) => 
{
  const { username, password } = req.body;  //creates constants for username and password from passed in request
  const query = 'INSERT INTO user_credentials (username, password) VALUES (?, ?)';  //creates query with those constants
  db.query(query, [username, password], (err, results) => //sends that query, receiving errors and results
  {
    if (err) //if an error is received from the db
    {
      console.error('Error inserting user credentials:', err);
      res.status(500).json({ error: 'Database error' });
    } 
    else 
    {
      res.status(200).json({ message: 'User credentials added successfully', userId: results.insertId });
    }
  });
});

// Route to handle user login
app.post('/login', async (req, res) => 
{
  const { username, password } = req.body;  // creates constants from passed request
  const query = 'SELECT * FROM user_credentials WHERE username = ?';  // SQL query to find entry with that username

  db.query(query, [username], async (err, results) => 
  {  // send query to database
      console.log("checking username", username, "\nchecking password", password);

      if (err) 
      {
          console.error('Database error:', err);  // log the error for debugging
          return res.status(500).send('Server error');  // send server error response
      }

      console.log("results length", results.length);
      if (results.length === 0) 
      {  // if no results found for the username
          return res.status(401).send('Invalid username or password like for realz');  // send unauthorized response
          console.log("results length", results.length);
      }

      // Uncomment and adjust this if password comparison is needed
      // const match = await bcrypt.compare(password, results[0].password);
      // if (!match) {
      //     return res.status(401).send('Invalid username or password');
      // }

      // Create session only if results are valid
      req.session.user = results[0];
      res.send('Login successful');  // send successful login response
  });
});



// User Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).send('Server error');
      }
      res.send('Logout successful');
  });
});


// Middleware to check if user is logged in
function checkAuth(req, res, next) {
  if (req.session.user) {
      next();
  } else {
      res.status(401).send('Unauthorized');
  }
}


// Start the server
app.listen(port, () => {
  console.log(`Server started successfully on port: ${port}`);
});


//simple protected route
app.get('/profile', checkAuth, (req, res) => {
  res.send(`Welcome, ${req.session.user.username}`);
});


// Route to check if user is authenticated
app.get('/check-auth', (req, res) => {
  if (req.session.user) {
      res.json({ loggedIn: true, username: req.session.user.username });
  } else {
      res.json({ loggedIn: false });
  }
});

