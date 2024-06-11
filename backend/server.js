const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const users = []; // 임시 사용자 저장소

// 이메일 전송을 위한 Nodemailer 설정
const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 587,
  secure: false, // TLS 사용
  auth: {
    user: 'sample1215@naver.com',  // 실제 네이버 이메일 주소
    pass: 'ZxCv0954z@',  // 실제 네이버 이메일 비밀번호
  },
  tls: {
    rejectUnauthorized: false
  }
});

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
    address,
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

// 비밀번호 재설정 링크 요청
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).send('Email not found');
  }

  const resetToken = 'dummy-reset-token'; // 실제 토큰 생성 로직을 구현해야 합니다.
  const resetLink = `http://yourwebsite.com/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: 'your-naver-email@naver.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send reset link');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send({ message: 'Reset link sent successfully' });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
