const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
  }));
  

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '636920286keko', 
  database: 'pruebaprueba' 
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    connection.release();
  }
});




// Create a client
app.post('/clients', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO clients (name, email) VALUES (?, ?)';
    pool.query(query, [name, email], (err, result) => {
      if (err) {
        console.error('Error creating a client:', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  });
  
  // Get all clients
  app.get('/clients', (req, res) => {
    const query = 'SELECT * FROM clients';
    pool.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving clients:', err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  });
  
  // Update a client
  app.put('/clients/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = 'UPDATE clients SET name = ?, email = ? WHERE id = ?';
    pool.query(query, [name, email, id], (err, result) => {
      if (err) {
        console.error('Error updating a client:', err);
        res.sendStatus(500);
      } else if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    });
  });
  
  // Delete a client
  app.delete('/clients/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM clients WHERE id = ?';
    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting a client:', err);
        res.sendStatus(500);
      } else if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    });
  });

  
  // Create a dwellings
app.post('/dwellings', (req, res) => {
    const { name, m2, price } = req.body;
    const query = 'INSERT INTO dwellings (name, m2, price) VALUES (?, ? , ?)';
    pool.query(query, [name, m2, price], (err, result) => {
      if (err) {
        console.error('Error creating a dwellings:', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  });
  
  // Get all dwellings
  app.get('/dwellings', (req, res) => {
    const query = 'SELECT * FROM dwellings';
    pool.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving dwellings:', err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  });
  
  // Update a client
  app.put('/dwellings/:id', (req, res) => {
    const { id } = req.params;
    const { name, m2, price } = req.body;
    const query = 'UPDATE dwellings SET name = ?, m2 = ? , price = ? WHERE id = ?';
    pool.query(query, [name, m2, price, id], (err, result) => {
      if (err) {
        console.error('Error updating a client:', err);
        res.sendStatus(500);
      } else if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    });
  });
  
  // Delete a client
  app.delete('/dwellings/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM dwellings WHERE id = ?';
    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting a client:', err);
        res.sendStatus(500);
      } else if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  
