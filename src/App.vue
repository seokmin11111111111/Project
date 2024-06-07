<template>
  <div class="app-container app-background">
    <div v-if="showHeader" class="header">
      <h1 @click="refreshPage">RECEIPT KEEPER</h1>
      <div class="auth-buttons">
        <button class="auth-button" @click="goToLogin">로그인</button>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div v-if="showFooter" class="footer">
      <router-link v-if="showFooterButtons" to="/home" class="footer-button" active-class="active">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220609%2Fourmid%2Fpngtree-week-finance-icon-outline-vector-png-image_4944788.png&type=sc960_832" alt="목록 아이콘" class="icon">
        <span>목록</span>
      </router-link>
      <router-link v-if="showFooterButtons" to="/stats" class="footer-button" active-class="active">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.freepik.com%2F256%2F6403%2F6403696.png&type=sc960_832" alt="통계 아이콘" class="icon">
        <span>통계</span>
      </router-link>
      <router-link v-if="showFooterButtons" to="/monthly" class="footer-button" active-class="active">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2F50%2Fa8%2Fab%2F50a8abc9cb17c477da92418085b7e1d5.jpg&type=sc960_832" alt="월별 아이콘" class="icon">
        <span>월별</span>
      </router-link>
      <router-link v-if="showFooterButtons" to="/settings" class="footer-button" active-class="active">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F684%2F684982.png&type=a340" alt="설정 아이콘" class="icon">
        <span>설정</span>
      </router-link>
    </div>
    <router-link v-if="showFooter && showFooterButtons" to="/form/new" class="add-button">+</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHeader: false,
      showFooter: true,
      showFooterButtons: true // 새로운 상태 변수 추가
    };
  },
  watch: {
    $route(to) {
      // 헤더와 푸터를 보여줄지 여부를 라우트에 따라 결정
      this.showHeader = to.path === '/home';
      this.showFooter = to.path !== '/login' && to.path !== '/register';
      this.showFooterButtons = to.path !== '/' && to.path !== '/some-other-route'; // 원하는 조건 추가
    }
  },
  methods: {
    refreshPage() {
      window.location.reload();
    },
    goToLogin() {
      this.$router.push('/login');
    }
  },
  created() {
    // 초기 라우트에 따라 헤더와 푸터를 보여줄지 여부 결정
    this.showHeader = this.$route.path === '/home';
    this.showFooter = this.$route.path !== '/login' && this.$route.path !== '/register';
    this.showFooterButtons = this.$route.path !== '/' && this.$route.path !== '/some-other-route'; // 원하는 조건 추가
  }
};
</script>

<style scoped>
@import './assets/styles.css';

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  color: black;
  cursor: pointer;
  text-align: left;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.app-background {
  background-color: #ffffff;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.footer-button {
  background: none;
  border: none;
  color: grey;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  box-sizing: border-box;
  transition: transform 0.3s;
}

.footer-button.active {
  transform: translateY(-5px);
}

.icon {
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
}

.footer-button span {
  font-size: 12px;
}

.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

</style>