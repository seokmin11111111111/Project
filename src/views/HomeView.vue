<template>
  <div class="home-content">
    <div class="header">
      <h1 @click="refreshPage">RECEIPT KEEPER</h1>
      <div class="auth-buttons">
        <button class="auth-button" @click="goToLogin">로그인</button>
      </div>
    </div>
    <div class="main-content">
      <p v-if="receipts.length === 0" class="no-data-message">영수증 데이터가 없습니다.<br />"+"버튼을 눌러 영수증 내역을 등록해보세요.</p>
      <router-link v-if="receipts.length === 0" to="/form" class="add-button">+</router-link>
      <div v-else class="receipts-list">
        <div v-for="(receipt, index) in receipts" :key="index" class="receipt-item" @click="goToDetail(index)">
          <div class="receipt-icon">📄</div>
          <div class="receipt-info">
            <p>{{ receipt.date }}</p>
            <p>{{ receipt.category }} | {{ receipt.detail }}</p>
            <p>{{ receipt.amount }}원</p>
          </div>
          <button @click.stop="handleDeleteReceipt(index)" class="delete-button">삭제</button>
        </div>
      </div>
    </div>
    <div class="home-footer">
     
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['receipts'])
  },
  methods: {
    ...mapActions(['deleteReceipt']),
    handleDeleteReceipt(index) {
      this.deleteReceipt(index);
      this.saveDetailsToLocalStorage();
    },
    goToDetail(index) {
      this.$router.push(`/form/${index}`);
    },
    refreshPage() {
      window.location.reload();
    },
    saveDetailsToLocalStorage() {
      const details = this.receipts.map(receipt => ({
        detail: receipt.detail,
        amount: parseFloat(receipt.amount)
      }));
      localStorage.setItem('details', JSON.stringify(details));
    },
    goToList() {
      this.$router.push('/list');
    },
    goToStats() {
      this.$router.push('/stats');
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    goToLogin() {
      this.$router.push('/login');
    }
  },
  watch: {
    receipts: {
      handler() {
        this.saveDetailsToLocalStorage();
      },
      deep: true
    }
  },
  mounted() {
    this.saveDetailsToLocalStorage();
  }
};
</script>

<style scoped>
.home-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 24px;
  color: black;
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-button {
  padding: 5px 10px;
  background-color: #708ca3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.main-content {
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.no-data-message {
  color: grey;
  margin-top: 20px;
  font-size: 16px;
}

.receipts-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.receipt-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  justify-content: space-between;
  cursor: pointer;
}

.receipt-icon {
  font-size: 24px;
  margin-right: 10px;
}

.receipt-info {
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-grow: 1;
}

.delete-button {
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button {
  margin-top: 20px;
  width: 50px;
  height: 50px;
  background-color: #708ca3;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.home-footer {
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  width: 100px;
  box-sizing: border-box;
}
</style>