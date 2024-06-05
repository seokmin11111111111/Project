<template>
    <div class="naver-login-container">
      <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fkmug.co.kr%2Fdata%2Ffile%2Fdesign%2Fthumb-1846294025_ntshf7Vk_992a3cae3dc7e29412d19099ec3381776daed803_760x460.png&type=sc960_832" alt="Naver Logo" class="naver-logo" />
      <div class="naver-login-form">
        <div class="input-group">
          <input type="text" placeholder="아이디" />
        </div>
        <div class="input-group">
          <input type="password" placeholder="비밀번호" />
        </div>
        <button class="login-button">로그인</button>
        <div class="login-options">
          <router-link to="/find-password" class="option-link">비밀번호 찾기</router-link>
          <span>|</span>
          <router-link to="/find-id" class="option-link">아이디 찾기</router-link>
          <span>|</span>
          <router-link to="/signup" class="option-link">회원가입</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NaverLogin'
  }
  </script>
  
  <style scoped>
  .naver-login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }
  
  .naver-logo {
    width: 100px;
    margin-bottom: 20px;
  }
  
  .naver-login-form {
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
  
  .login-button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .login-options {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    color: grey;
  }
  
  .option-link {
    color: #1ec800;
    text-decoration: none;
    margin: 0 5px;
  }
  </style>
  