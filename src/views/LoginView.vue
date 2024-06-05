<template>
  <div class="login-container">
    <h1>RECEIPT KEEPER</h1>
    <p class="subtitle">Make a receipt and take care of it</p>
    <div class="login-form">
      <div class="input-group">
        <label for="email">이메일 주소</label>
        <input type="email" id="email" placeholder="예) sample0000@naver.com" />
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <div class="password-container">
          <input type="password" id="password" />
          <button class="toggle-password">👁️</button>
        </div>
      </div>
      <button class="login-button">로그인</button>
      <div class="signup-prompt">
        <span>아이디가 없으신가요?</span>
        <router-link to="/signup" class="signup-link">회원가입</router-link>
      </div>
      <button class="social-login naver-login" @click="goToNaverLogin">네이버로 로그인</button>
      <button class="social-login kakao-login" @click="goToKakaoLogin">카카오로 로그인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    goToNaverLogin() {
      this.$router.push('/naver-login');
    },
    goToKakaoLogin() {
      this.$router.push('/kakao-login');
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 32px;
  font-weight: bold;
}

.subtitle {
  margin-top: -10px;
  font-size: 14px;
  color: grey;
}

.login-form {
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

.input-group label {
  margin-bottom: 5px;
}

.input-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.password-container {
  display: flex;
  align-items: center;
}

.password-container input {
  flex-grow: 1;
  width: calc(100% - 30px);
  box-sizing: border-box;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
}

.login-button {
  padding: 10px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.signup-prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.signup-prompt span {
  margin-right: 5px;
  color: grey;
}

.signup-link {
  color: #708ca3;
  text-decoration: none;
  cursor: pointer;
}

.social-login {
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.naver-login {
  background-color: #1ec800;
  color: #fff;
}

.kakao-login {
  background-color: #fee500;
  color: #000;
}
</style>