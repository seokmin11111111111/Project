const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zxcv0954z@', // 본인의 MySQL 비밀번호로 변경하세요.
  database: 'user_registration'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

// 회원가입 엔드포인트
app.post('/register', (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, address } = req.body;

  const sql = 'INSERT INTO users (email, password, first_name, last_name, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [email, password, firstName, lastName, phoneNumber, address];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting user data:', err);
      res.status(500).send('Failed to register');
      return;
    }
    res.status(200).send({ message: 'User registered successfully', userId: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
