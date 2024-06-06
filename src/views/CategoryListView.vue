<template>
  <div class="category-list-view">
    <div class="header">
      <button class="back-button" @click="goBack">↩</button>
      <h2>구분 리스트</h2>
    </div>
    <div class="content">
      <div v-for="(category, index) in categories" :key="index" class="category-item">
        <div class="category-item-content">
          <span @click="selectCategory(category)">{{ category }}</span>
          <button @click="deleteCategory(index)" class="delete-button">
            <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20230222%2Fourmid%2Fpngtree-trash-line-icon-png-image_6614583.png&type=sc960_832" alt="휴지통 아이콘" class="icon">
          </button>
        </div>
      </div>
    </div>
    <router-link to="/categories/add" class="add-button">+</router-link>
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
  position: relative; /* Ensure relative positioning for the add button */
}

.header {
  width: 100%;
  padding: 20px;
  padding-right: 60px; /* Ensure space for the add button */
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 {
  margin: 0;
  font-size: 24px;
  width: 100%; /* 가로 길이 100%로 설정 */
  max-width: 800px; /* 최대 가로 길이 설정 */
  margin: 0 300px; /* 양 옆의 여백을 균등하게 설정 */
}

.back-button, .add-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.back-button {
  font-size: 24px;
  color: #000000;
}

.add-button {
  font-size: 32px;
  font-weight: bold;
  position: absolute;
  top: 20px; /* Align with the header's top padding */
  right: -50px; /* Align with the header's right padding */
  background-color: #007bff; /* Background color */
  color: white; /* White text */
  border-radius: 50%; /* Round button */
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
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
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 20px;
  cursor: pointer;
}

.icon {
  width: 20px; /* Adjust the size as needed */
  height: 20px;
}

.delete-button i {
  pointer-events: none;
}
</style>