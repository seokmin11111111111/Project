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
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      signIn() {
        // Sign in logic here
      },
      goToRegister() {
        this.$router.push('/register');
      }
    },
  };
  </script>
  
  <style scoped>
  .auth-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .auth-form input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .auth-form button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .auth-form a {
    color: #007bff;
    text-decoration: none;
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