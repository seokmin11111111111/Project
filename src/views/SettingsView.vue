<template>
  <div :class="['settings-view', { dark: isDarkMode }]">
    <div class="header">
      <button @click="goBack" class="back-button">↩</button>
      <h2>설정</h2>
    </div>
    <div class="content">
      <div class="settings-group">
        <router-link to="/categories" class="settings-item">구분 목록 조회</router-link>
        <router-link to="/accounts" class="settings-item">지출처 목록 조회</router-link>
      </div>
      <div class="settings-group">
        <button class="settings-item" @click="toggleTheme">스타일: {{ isDarkMode ? '다크 모드' : '라이트 모드' }}</button>
        <router-link to="/privacy" class="settings-item">로그아웃</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SettingsView',
  setup() {
    const isDarkMode = ref(localStorage.getItem('theme') === 'dark');

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      if (isDarkMode.value) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };

    if (isDarkMode.value) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    const goBack = () => {
      window.history.back();
    };

    return {
      isDarkMode,
      toggleTheme,
      goBack
    };
  }
};
</script>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  color: black;
  
}

.settings-view.dark {
  background-color: #121212;
  color: white;
}

.header {
  width: 100%;
  padding: 20px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.header.dark {

}

.header h2 {
  margin: 0;
  font-size: 24px;
  width: 100%; /* 가로 길이 100%로 설정 */
  max-width: 800px; /* 최대 가로 길이 설정 */
  margin: 0 300px; /* 양 옆의 여백을 균등하게 설정 */
}

.settings-title {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 37.5px; /* 둥근 테두리 */
  
}

.back-button {
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: inherit;
}

.content {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.settings-item {
  display: block;
  padding: 15px;
  color: rgb(0, 0, 0); /* 텍스트 색상 화이트 */
  background-color: #ffffff; /* 배경 색상 */
  text-decoration: none;
  text-align: center;
  border-radius: 37.5px; /* 둥근 테두리 */
  cursor: pointer;
  
}

.settings-item.dark {
  color: white;
  background-color: #007bff; /* 다크 모드에서도 같은 배경 색상 */
}

.settings-item:hover {
  background-color: #afcbe8; /* 호버 시 색상 변경 */
}
</style>