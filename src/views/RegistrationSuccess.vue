<template>
    <div class="success-container">
      <h2>회원가입이 완료되었습니다!</h2>
      <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F04%2F02%2F10%2F58%2Fchick-305108_960_720.png&type=sc960_832" alt="Success Image" class="success-image" />
      <button @click="goToLogin">로그인 페이지로 이동</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToLogin() {
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .success-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .success-container h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .success-image {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 30px; /* 버튼 둥글게 */
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease; /* 호버 효과 */
    outline: none; /* 테두리 박스 없애기 */
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>