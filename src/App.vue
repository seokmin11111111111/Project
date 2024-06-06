<template>
  <div class="app-container app-background">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="footer" v-if="showFooter">
      <router-link to="/home" class="footer-button" active-class="active">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220609%2Fourmid%2Fpngtree-week-finance-icon-outline-vector-png-image_4944788.png&type=sc960_832" alt="목록 아이콘" class="icon">
        <span>목록</span>
      </router-link>
      <router-link to="/stats" class="footer-button" active-class="active">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.freepik.com%2F256%2F6403%2F6403696.png&type=sc960_832" alt="통계 아이콘" class="icon">
        <span>통계</span>
      </router-link>
      <router-link to="/monthly" class="footer-button" active-class="active">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2F50%2Fa8%2Fab%2F50a8abc9cb17c477da92418085b7e1d5.jpg&type=sc960_832" alt="월별 아이콘" class="icon">
        <span>월별</span>
      </router-link>
      <router-link to="/settings" class="footer-button" active-class="active">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F684%2F684982.png&type=a340" alt="설정 아이콘" class="icon">
        <span>설정</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    showFooter() {
      return this.$route.name !== 'form' && this.$route.name !== 'start';
    }
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

.footer {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
  position: relative;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-button {
  background-color: white;
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

.app-background {
  background-color: #ffffff; /* 원하는 배경색으로 변경 */
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* 페이드 인/아웃 애니메이션 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 밀어내는 효과 애니메이션 */
.footer-button.active {
  animation: push 0.3s forwards;
}

@keyframes push {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(-5px);
  }
}
</style>