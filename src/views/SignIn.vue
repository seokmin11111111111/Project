<template>
  <div class="auth-container">
    <h2>LOGIN</h2>
    <form class="auth-form">
      <input type="email" placeholder="Email address" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="button" @click="signIn">Login</button>
      <a href="#">Forgot your password?</a>
      <p>회원이 아니신가요? <button type="button" class="text-button" @click="goToRegister">회원가입</button></p>
    </form>
    <p>{{ message }}</p> <!-- 메시지 표시 -->
    <button class="back-button" @click="goBack">home가기</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async signIn() {
      console.log('Sign in button clicked');

      const user = {
        email: this.email,
        password: this.password,
      };

      console.log('User data to be sent:', user);

      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        console.log('Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          this.message = data.message;
          console.log('Login successful:', data);
          this.login(data.userId);
          alert("로그인되었습니다.");
          this.$router.push('/home');
        } else {
          const errorText = await response.text();
          console.error('Error response text:', errorText);
          this.message = errorText;
          alert('Failed to login');
        }
      } catch (error) {
        console.error('Error:', error);
        this.message = 'An error occurred';
        alert('An error occurred');
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goBack() {
      this.$router.go(-1);
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
  width: 100%;
  background: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
}

.auth-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  width: 100%;
  box-sizing: border-box;
}

.auth-form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
  outline: none;
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

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #5a6268;
}
</style>