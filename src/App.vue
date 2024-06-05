<template>
  <div class="app-container app-background">
    <router-view></router-view>
    <div class="footer" v-if="showFooter">
      <router-link to="/" class="footer-button">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220609%2Fourmid%2Fpngtree-week-finance-icon-outline-vector-png-image_4944788.png&type=sc960_832" alt="목록 아이콘" class="icon">
        <span>목록</span>
      </router-link>
      <router-link to="/stats" class="footer-button">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.freepik.com%2F256%2F6403%2F6403696.png&type=sc960_832" alt="통계 아이콘" class="icon">
        <span>통계</span>
      </router-link>
      <router-link to="/settings" class="footer-button">
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
      return this.$route.name !== 'form';
    }
  }
};
</script>

<style scoped>
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

@import './assets/styles.css';
</style>