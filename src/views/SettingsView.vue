<template>
    <div :class="['settings-view', { dark: isDarkMode }]">
      <div class="header">
        <h2>설정</h2>
      </div>
      <div class="content">
        <div class="settings-group">
          <router-link to="/categories" class="settings-item">구분 목록 조회</router-link>
          <router-link to="/accounts" class="settings-item">비목 목록 조회</router-link>
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
  
      return {
        isDarkMode,
        toggleTheme
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
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .header.dark {
    background-color: #1f1f1f;
  }
  
  .header h2 {
    margin: 0;
    font-size: 24px;
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
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .settings-group.dark {
    background-color: #333333;
  }
  
  .settings-item {
    display: block;
    padding: 15px;
    color: #000;
    text-decoration: none;
    border-bottom: 1px solid #e0e0e0;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
  
  .settings-item.dark {
    color: #fff;
    border-bottom: 1px solid #555;
  }
  
  .settings-item:last-child {
    border-bottom: none;
  }
  </style>