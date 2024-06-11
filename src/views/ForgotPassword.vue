<template>
    <div class="forgot-password-container">
      <h2>Forgot Password</h2>
      <form class="forgot-password-form">
        <input type="email" placeholder="Enter your email address" v-model="email" />
        <button type="button" @click="sendResetLink">Send Reset Link</button>
      </form>
      <p>{{ message }}</p> <!-- 메시지 표시 -->
      <button class="back-button" @click="goBack">Back to Login</button>
    </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        email: '',
        message: '',
      };
    },
    methods: {
      async sendResetLink() {
        console.log('Send reset link button clicked');
  
        const user = {
          email: this.email,
        };
  
        console.log('User email to be sent:', user);
  
        try {
          const response = await fetch('http://localhost:3000/forgot-password', {
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
            console.log('Reset link sent successfully:', data);
            alert("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
          } else {
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            this.message = errorText;
            alert('Failed to send reset link');
          }
        } catch (error) {
          console.error('Error:', error);
          this.message = 'An error occurred';
          alert('An error occurred');
        }
      },
      goBack() {
        this.$router.push('/login');
      }
    },
  };
  </script>
    
  <style scoped>
  .forgot-password-container {
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
    
  .forgot-password-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
  }
    
  .forgot-password-form input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 30px;
    width: 100%;
    box-sizing: border-box;
  }
    
  .forgot-password-form button {
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
    
  .forgot-password-form button:hover {
    background-color: #0056b3;
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
  