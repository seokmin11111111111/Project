<template>
  <div class="add-account-view">
    <div class="header">
      <button class="back-button" @click="goBack">＜</button>
      <h2>항목 추가</h2>
      <button class="save-button" @click="saveAccount">저장</button>
    </div>
    <div class="content">
      <input v-model="newAccount" type="text" class="input-field" placeholder="내용을 입력하세요.">
      <p class="description">비목 항목은 회사 또는 개인 사업체 등을 구분하기 위한 항목입니다.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AddAccountView',
  setup() {
    const newAccount = ref('');
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    const saveAccount = () => {
      if (newAccount.value.trim()) {
        const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
        storedAccounts.push(newAccount.value.trim());
        localStorage.setItem('accounts', JSON.stringify(storedAccounts));
        router.push('/accounts');
        window.dispatchEvent(new Event('storage'));
      }
    };

    return {
      newAccount,
      goBack,
      saveAccount
    };
  }
};
</script>

<style scoped>
.add-account-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center; /* Center content vertically */
  align-items: center;
  padding-top: 80px; /* Add top padding to ensure header is visible */
}

.header {
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* Make header fixed to the top */
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  margin-top: 60px; /* Add margin to move content down */
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