<template>
    <div class="account-list-view">
      <div class="header">
        <button class="back-button" @click="goBack">＜</button>
        <h2>비목 리스트</h2>
        <router-link to="/accounts/add" class="add-button">추가</router-link>
      </div>
      <div class="content">
        <div v-for="(account, index) in accounts" :key="index" class="account-item">
          <div class="account-item-content">
            <router-link :to="`/account/${index}`">{{ account }}</router-link>
            <button @click="deleteAccount(index)" class="delete-button">삭제</button>
          </div>
        </div>
      </div>
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
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>