<template>
  <div class="account-list-view">
    <div class="header">
      <button class="back-button" @click="goBack">＜</button>
      <h2>지출처 리스트</h2>
    </div>
    <div class="content">
      <div v-for="(account, index) in accounts" :key="index" class="account-item">
        <div class="account-item-content">
          <router-link :to="`/account/${index}`">{{ account }}</router-link>
          <button @click="deleteAccount(index)" class="delete-button">
            <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20230222%2Fourmid%2Fpngtree-trash-line-icon-png-image_6614583.png&type=sc960_832" alt="휴지통 아이콘" class="icon">
          </button>
        </div>
      </div>
    </div>
    <router-link to="/accounts/add" class="add-button">+</router-link>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AccountListView',
  setup() {
    const accounts = ref([]);
    const router = useRouter();

    const loadAccounts = () => {
      const storedAccounts = JSON.parse(localStorage.getItem('accounts'));
      if (storedAccounts) {
        accounts.value = storedAccounts;
      }
    };

    const saveAccounts = () => {
      localStorage.setItem('accounts', JSON.stringify(accounts.value));
    };

    const deleteAccount = (index) => {
      accounts.value.splice(index, 1);
      saveAccounts();
    };

    onMounted(() => {
      loadAccounts();
      window.addEventListener('storage', loadAccounts);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('storage', loadAccounts);
    });

    const goBack = () => {
      router.go(-1);
    };

    return {
      accounts,
      goBack,
      deleteAccount
    };
  },
};
</script>

<style scoped>
.account-list-view {
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
}

.back-button, .add-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.add-button {
  font-size: 32px;
  font-weight: bold;
  position: absolute;
  top: 20px; /* Align with the header's top padding */
  right: -50px; /* Align with the header's right padding */
  background-color: #708ca3; /* Background color */
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

.account-item {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.account-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account-item a {
  text-decoration: none;
  color: #000;
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