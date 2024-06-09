<template>
  <div class="auth-container">
    <h2>회원 가입</h2>
    <form class="auth-form" @submit.prevent="register">
      <input type="email" placeholder="이메일 주소" v-model="email" />
      <input type="password" placeholder="비밀번호" v-model="password" />
      <input type="password" placeholder="비밀번호 확인" v-model="confirmPassword" />
      <input type="text" placeholder="이름" v-model="firstName" />
      <input type="text" placeholder="성" v-model="lastName" />
      <input type="text" placeholder="전화번호" v-model="phoneNumber" />
      <input type="text" placeholder="주소" v-model="address" />
      <button type="submit">가입하기</button>
    </form>
    <p>{{ message }}</p>
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
      message: ''
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.message = 'Passwords do not match!';
        return;
      }

      const user = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        address: this.address,
      };

      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          const data = await response.json();
          this.message = data.message;
          alert(`User registered successfully with ID: ${data.userId}`);
          this.$router.push('/register/success');
        } else {
          const errorText = await response.text();
          this.message = errorText;
          alert('Failed to register');
        }
      } catch (error) {
        console.error('Error:', error);
        this.message = 'An error occurred';
        alert('An error occurred');
      }
    }
  }
};
</script>

<style scoped>
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

.auth-form p {
  margin-top: 20px;
  color: red;
}
</style>
