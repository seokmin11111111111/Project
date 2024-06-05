<template>
    <div class="signup-container">
      <h1>회원가입</h1>
      <div class="signup-steps">
         <span>정보입력</span> > <span>가입완료</span>
      </div>
      <div class="signup-form">
        <div class="input-group">
          <label for="username">아이디</label>
          <input type="text" id="username" />
          <button class="check-button">중복확인</button>
        </div>
        <div class="input-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" />
        </div>
        <div class="input-group">
          <label for="confirm-password">비밀번호 확인</label>
          <input type="password" id="confirm-password" />
        </div>
        <div class="input-group">
          <label for="name">이름</label>
          <input type="text" id="name" />
        </div>
        <div class="input-group">
          <label for="phone">휴대전화</label>
          <div class="phone-group">
            <select>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="011">031</option>
              <!-- 다른 옵션들 -->
            </select>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div class="input-group">
          <label for="email">이메일</label>
          <input type="email" id="email" />
          <button class="check-button">중복확인</button>
        </div>
        <button class="signup-button">가입하기</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .signup-steps {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
  }
  
  .signup-steps span {
    font-size: 14px;
  }
  
  .signup-form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    text-align: left;
    position: relative;
  }
  
  .input-group label {
    margin-bottom: 5px;
  }
  
  .input-group input,
  .input-group select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .phone-group {
    display: flex;
    gap: 5px;
  }
  
  .check-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 5px 10px;
    background-color: #708ca3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .signup-button {
    padding: 10px;
    background-color: #708ca3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>