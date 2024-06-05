<template>
    <div class="add-category-view">
      <div class="header">
        <button class="back-button" @click="goBack">＜</button>
        <h2>항목 추가</h2>
        <button class="save-button" @click="saveCategory">저장</button>
      </div>
      <div class="content">
        <input v-model="newCategory" type="text" class="input-field" placeholder="내용을 입력하세요.">
        <p class="description">구분 항목은 회사 또는 개인 사업체 등을 구분하기 위한 항목입니다.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AddCategoryView',
    setup() {
      const newCategory = ref('');
      const router = useRouter();
  
      const goBack = () => {
        router.go(-1);
      };
  
      const saveCategory = () => {
        if (newCategory.value.trim()) {
          const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
          storedCategories.push(newCategory.value.trim());
          localStorage.setItem('categories', JSON.stringify(storedCategories));
          router.push('/categories');
          window.dispatchEvent(new Event('storage'));
        }
      };
  
      return {
        newCategory,
        goBack,
        saveCategory
      };
    }
  };
  </script>
  
  <style scoped>
  .add-category-view {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: flex-start;
    align-items: center;
  }
  
  .header {
    width: 100%;
    padding: 20px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header h2 {
    margin: 0;
    font-size: 24px;
  }
  
  .back-button, .save-button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  
  .content {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  
  .input-field {
    width: calc(100% - 40px);
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .description {
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  </style>