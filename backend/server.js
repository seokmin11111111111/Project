const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // db.js 파일을 올바르게 경로로 설정
const bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 회원가입 엔드포인트
app.post('/register', (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, address } = req.body;

  // 이메일 중복 체크
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send({ message: 'Database query error' });
      return;
    }

    if (results.length > 0) {
      res.status(400).send({ message: 'Email already exists' });
      return;
    }

    // 이메일 중복이 아니면 회원가입 진행
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
});

// 로그인 엔드포인트
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Database query error');
      return;
    }

    if (results.length === 0) {
      res.status(400).send('Invalid email or password');
      return;
    }

    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      res.status(400).send('Invalid email or password');
      return;
    }

    res.send({ message: 'Login successful', userId: user.id });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
