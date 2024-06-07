<template>
    <div class="auth-container">
      <h2>Sign up</h2>
      <form class="auth-form">
        <input type="email" placeholder="Email address" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <input type="password" placeholder="Confirm password" v-model="confirmPassword" />
        <input type="text" placeholder="First name" v-model="firstName" />
        <input type="text" placeholder="Last name" v-model="lastName" />
        <input type="text" placeholder="Phone number" v-model="phoneNumber" />
        <input type="text" placeholder="Address" v-model="address" />
        <button type="button" @click="register">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
      };
    },
    methods: {
      register() {
        // Registration logic here
      },
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
  </style>
  