const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zxcv0954z@',
  database: 'auth_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// 회원가입 엔드포인트
app.post('/register', (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, address } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const insertUserQuery = 'INSERT INTO users (email, password, first_name, last_name, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(insertUserQuery, [email, hashedPassword, firstName, lastName, phoneNumber, address], (err, results) => {
    if (err) {
      console.error('Database insert error:', err);
      res.status(500).send({ message: 'Database insert error' });
      return;
    }

    res.send({ message: 'User registered successfully', userId: results.insertId });
  });
});

// 로그인 엔드포인트
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const findUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(findUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Database select error:', err);
      res.status(500).send({ message: 'Database select error' });
      return;
    }

    if (results.length === 0) {
      res.status(401).send({ message: 'Invalid email or password' });
      return;
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send({ message: 'Invalid email or password' });
      return;
    }

    res.send({ message: 'Login successful', userId: user.id });
  });
});

module.exports = app;
