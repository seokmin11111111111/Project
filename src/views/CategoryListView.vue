<template>
  <div class="category-list-view">
    <div class="header">
      <button class="back-button" @click="goBack">↩</button>
      <h2>구분 리스트</h2>
    </div>
    <div class="content">
      <button class="new-folder-button" @click="addCategory">
        <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimage.pngaaa.com%2F556%2F6289556-middle.png&type=sc960_832" alt="new folder icon" class="new-folder-icon">
        New Folder
      </button>
      <div v-for="(category, index) in categories" :key="index" class="category-item">
        <div class="category-item-content">
          <input type="checkbox" class="checkbox"/>
          <span @click="selectCategory(category)">{{ category }}</span>
          <button @click="deleteCategory(index)" class="delete-button">
            <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20230222%2Fourmid%2Fpngtree-trash-line-icon-png-image_6614583.png&type=sc960_832" alt="휴지통 아이콘" class="icon">
          </button>
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

    const addCategory = () => {
      const newCategory = prompt('Enter new category:');
      if (newCategory) {
        categories.value.push(newCategory);
        saveCategories();
      }
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
      addCategory,
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
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header h2 {
  margin: 0;
  font-size: 24px;
}

.back-button {
  font-size: 24px;
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
}

.new-folder-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
}

.new-folder-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.content {
  width: 100%;
  padding: 20px;
  padding-top: 80px; /* Add top padding to avoid overlap with header */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Enable vertical scrolling */
}

.category-item {
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.category-item-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.category-item span {
  flex-grow: 1;
  cursor: pointer;
  margin-left: 10px;
}

.checkbox {
  margin-right: 10px;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

.icon {
  width: 20px; /* Adjust the size as needed */
  height: 20px;
}

.delete-button i {
  pointer-events: none;
}
</style>
