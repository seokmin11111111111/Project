<template>
  <div class="auth-container">
    <h2>Sign in</h2>
    <form class="auth-form">
      <input type="email" placeholder="Email address" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="button" @click="signIn">Sign in</button>
      <a href="#">Forgot your password?</a>
      <p>회원이 아니신가요? <button type="button" class="text-button" @click="goToRegister">회원가입</button></p>
    </form>
    <p>{{ message }}</p> <!-- 메시지 표시 -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '', // 메시지 데이터 추가
    };
  },
  methods: {
    ...mapActions(['login']),
    async signIn() {
      console.log('Sign in button clicked'); // 디버그 로그 추가

      const user = {
        email: this.email,
        password: this.password,
      };

      console.log('User data to be sent:', user); // 디버그 로그 추가

      try {
        const response = await fetch('http://localhost:3000/login', { // 서버 URL 확인
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        console.log('Response status:', response.status); // 디버그 로그 추가

        if (response.ok) {
          const data = await response.json();
          this.message = data.message;
          console.log('Login successful:', data); // 디버그 로그 추가
          this.login(data.userId); // Vuex 상태 업데이트
          alert(`Login successful with ID: ${data.userId}`);
          this.$router.push('/home'); // 로그인 후 HomeView로 이동
        } else {
          const errorText = await response.text();
          console.error('Error response text:', errorText); // 디버그 로그 추가
          this.message = errorText;
          alert('Failed to login');
        }
      } catch (error) {
        console.error('Error:', error); // 디버그 로그 추가
        this.message = 'An error occurred';
        alert('An error occurred');
      }
    },
    goToRegister() {
      this.$router.push('/register');
    }
  },
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.auth-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%; /* 부모 요소의 전체 너비를 차지하도록 설정 */
  background: #f0f0f0; /* 배경색 추가 */
  padding: 20px;
  box-sizing: border-box; /* 패딩 포함 전체 너비/높이 계산 */
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px; /* 폼 너비 고정 */
}

.auth-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 30px; /* 입력 필드 둥글게 */
  width: 100%;
  box-sizing: border-box;
}

.auth-form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 30px; /* 버튼 둥글게 */
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s ease; /* 호버 효과 */
}

.auth-form button:hover {
  background-color: #0056b3;
}

.auth-form a {
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
}

.auth-form p {
  margin-top: 20px;
}

.text-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font: inherit;
  color: #007bff;
  outline: none; 
  box-shadow: none; 
}

.text-button:focus {
  outline: none; 
  box-shadow: none; 
}
</style>
