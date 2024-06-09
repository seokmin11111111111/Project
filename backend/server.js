const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const users = []; // 임시 사용자 저장소

// 회원가입
app.post('/register', (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, address } = req.body;

  const user = {
    id: users.length + 1,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    address
  };

  users.push(user);
  res.status(201).json({ userId: user.id, message: 'User registered successfully' });
});

// 로그인
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({ userId: user.id, message: 'Login successful' });
  } else {
    res.status(401).send('Invalid email or password');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
