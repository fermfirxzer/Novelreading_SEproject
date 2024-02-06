// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'mc',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Example API endpoint to fetch data from MySQL
app.get('http://localhost:5000/api/tasks', (req, res) => {
    const query = 'SELECT branch_id FROM branches';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      console.log('Sending JSON response:', results);
      res.json(results);
    });
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });



  