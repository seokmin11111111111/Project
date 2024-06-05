<template>
  <div class="category-list-view">
    <div class="header">
      <button class="back-button" @click="goBack">＜</button>
      <h2>구분 리스트</h2>
      <router-link to="/categories/add" class="add-button">추가</router-link>
    </div>
    <div class="content">
      <div v-for="(category, index) in categories" :key="index" class="category-item">
        <div class="category-item-content">
          <span @click="selectCategory(category)">{{ category }}</span>
          <button @click="deleteCategory(index)" class="delete-button">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CategoryListView',
  setup() {
    const categories = ref([]);
    const router = useRouter();

    const loadCategories = () => {
      const storedCategories = JSON.parse(localStorage.getItem('categories'));
      if (storedCategories) {
        categories.value = storedCategories;
      }
    };

    const saveCategories = () => {
      localStorage.setItem('categories', JSON.stringify(categories.value));
    };

    const deleteCategory = (index) => {
      categories.value.splice(index, 1);
      saveCategories();
    };

    const selectCategory = (category) => {
      router.push({ name: 'ReceiptForm', params: { selectedCategory: category } });
    };

    onMounted(() => {
      loadCategories();
      window.addEventListener('storage', loadCategories);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('storage', loadCategories);
    });

    const goBack = () => {
      router.go(-1);
    };

    return {
      categories,
      goBack,
      deleteCategory,
      selectCategory
    };
  },
};
</script>

<style scoped>
.category-list-view {
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

.back-button, .add-button {
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
}

.category-item {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.category-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-item span {
  cursor: pointer;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>