<template>
    <div class="kakao-login-container">
      <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5358%2F2023%2F02%2F07%2F0000477500_001_20230207155001865.jpg&type=a340" alt="Kakao Logo" class="kakao-logo" />
      <div class="kakao-login-form">
        <div class="input-group">
          <input type="text" placeholder="카카오메일 아이디, 이메일, 전화번호" />
        </div>
        <div class="input-group">
          <input type="password" placeholder="비밀번호" />
        </div>
        <div class="option-group">
          <input type="checkbox" id="save-info" />
          <label for="save-info">간편로그인 정보 저장</label>
        </div>
        <button class="login-button">로그인</button>
        <button class="qr-login-button">QR코드 로그인</button>
        <div class="login-options">
          <router-link to="/signup" class="option-link">회원가입</router-link>
          <span>|</span>
          <router-link to="/find-id" class="option-link">계정 찾기</router-link>
          <span>|</span>
          <router-link to="/find-password" class="option-link">비밀번호 찾기</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'KakaoLogin'
  }
  </script>
  
  <style scoped>
  .kakao-login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }
  
  .kakao-logo {
    width: 100px;
    margin-bottom: 20px;
  }
  
  .kakao-login-form {
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
  }
  
  .input-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .option-group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    font-size: 14px;
    color: grey;
  }
  
  .login-button {
    padding: 10px;
    background-color: #fee500;
    color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .qr-login-button {
    padding: 10px;
    background-color: #ccc;
    color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .login-options {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    color: grey;
  }
  
  .option-link {
    color: #000;
    text-decoration: none;
    margin: 0 5px;
  }
  </style>
  