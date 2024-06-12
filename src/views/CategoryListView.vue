<template>
  <div class="category-list-view">
    <div class="header">
      <button class="back-button" @click="goBack">↩</button>
      <h2 class="title">카테고리 리스트</h2>
    </div>
    <div class="content">
      <button class="new-folder-button" @click="showModal = true">
        추가하기
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

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>새 카테고리 추가</h3>
        <input v-model="newCategory" type="text" placeholder="새 카테고리 이름을 입력하세요" />
        <div class="modal-buttons">
          <button @click="confirmAddCategory" class="confirm-button">추가</button>
          <button @click="showModal = false" class="cancel-button">취소</button>
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
    const showModal = ref(false);
    const newCategory = ref('');
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

    const confirmAddCategory = () => {
      if (newCategory.value) {
        categories.value.push(newCategory.value);
        saveCategories();
        newCategory.value = '';
        showModal.value = false;
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
      showModal,
      newCategory,
      goBack,
      confirmAddCategory,
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
  position: relative;
}

.header {
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0;
  font-size: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.back-button {
  position: absolute;
  left: 20px;
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

.content {
  width: 100%;
  padding: 20px;
  padding-top: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
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
  width: 20px;
  height: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.modal h3 {
  margin-bottom: 20px;
  font-size: 18px;
}

.modal input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.confirm-button, .cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex-grow: 1;
  margin: 5px;
}

.confirm-button {
  background-color: #007bff;
  color: white;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
}
</style>
