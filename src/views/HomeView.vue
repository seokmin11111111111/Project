<template>
  <div class="home-content">
    <div class="header">
      <h1 @click="refreshPage">RECEIPT KEEPER</h1>
      <div class="auth-buttons">
        <button v-if="!isAuthenticated" class="auth-button" @click="goToLogin">로그인</button>
        <button v-else class="auth-button" @click="showLogoutModal">로그아웃</button>
      </div>
    </div>
    <div class="main-content">
      <div class="month-filter">
        <label for="filter-month">월 선택:</label>
        <input type="month" id="filter-month" v-model="filterMonth" @change="filterReceiptsByMonth" />
      </div>
      <div class="summary">
        <p>이달의 사용금액: {{ thisMonthUsage.toLocaleString() }} 원</p>
      </div>
      <div v-if="filteredReceipts.length === 0" class="no-data-container">
        <p class="no-data-message">영수증 데이터가 없습니다.<br />"+"버튼을 눌러 영수증 내역을 등록해보세요.</p>
        <router-link to="/form/new" class="add-button">+</router-link>
      </div>
      <div class="receipts-list">
        <div
          v-for="(receipt, index) in filteredReceipts"
          :key="receipt.id"
          class="receipt-item"
          @click="selectReceipt(receipt)"
        >
          <div class="receipt-info">
            <div class="receipt-text">
              <p class="payment" v-if="receipt.payment">{{ receipt.payment }}</p>
              <p class="amount" v-if="receipt.amount">{{ (receipt.amount || 0).toLocaleString() }}원</p>
              <p class="date">{{ receipt.date }}</p>
              <p class="total" v-if="receipt.totalAmount">{{ (receipt.totalAmount || 0).toLocaleString() }}원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/form/new" class="add-button">+</router-link>

    <div v-if="selectedReceipt" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <ReceiptDetail :receipt="selectedReceipt" @delete-receipt="handleDeleteReceipt" />
        <button @click="closeModal" class="option-button">닫기</button>
      </div>
    </div>

    <div v-if="showLogout" class="modal-overlay" @click="closeLogoutModal">
      <div class="modal" @click.stop>
        <p>로그아웃 하시겠습니까?</p>
        <button @click="confirmLogout" class="option-button">로그아웃하기</button>
        <button @click="closeLogoutModal" class="option-button">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ReceiptDetail from './ReceiptDetail.vue';

export default {
  name: 'HomeView',
  components: {
    ReceiptDetail
  },
  data() {
    return {
      filterMonth: new Date().toISOString().substr(0, 7),
      filteredReceipts: [],
      selectedReceipt: null,
      showLogout: false,
    };
  },
  computed: {
    ...mapGetters(['receipts', 'isAuthenticated']),
    thisMonthUsage() {
      return this.filteredReceipts.reduce((total, receipt) => {
        return total + Number(receipt.amount || 0);
      }, 0);
    }
  },
  methods: {
    ...mapActions(['deleteReceipt', 'logout']),
    handleDeleteReceipt(id) {
      const index = this.receipts.findIndex(receipt => receipt.id === id);
      if (index !== -1) {
        this.deleteReceipt(index);
        this.filterReceiptsByMonth();
        this.selectedReceipt = null;
      }
    },
    refreshPage() {
      window.location.reload();
    },
    goToLogin() {
      this.$router.push('/login');
    },
    showLogoutModal() {
      this.showLogout = true;
    },
    closeLogoutModal() {
      this.showLogout = false;
    },
    confirmLogout() {
      this.logout();
      this.showLogout = false;
    },
    filterReceiptsByMonth() {
      const month = this.filterMonth;
      this.filteredReceipts = this.receipts
        .filter(receipt => receipt.date.startsWith(month))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    selectReceipt(receipt) {
      this.selectedReceipt = receipt;
    },
    closeModal() {
      this.selectedReceipt = null;
    }
  },
  watch: {
    receipts: {
      handler() {
        this.filterReceiptsByMonth();
      },
      immediate: true
    }
  },
  created() {
    this.filterReceiptsByMonth();
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
  justify-content: center;
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
  text-align: center;
  flex: 1;
}

.auth-buttons {
  position: absolute;
  right: 20px;
  display: flex;
  gap: 10px;
}

.auth-button {
  padding: 5px 10px;
  background-color: #007bff;
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
  padding-bottom: 80px;
}

.month-filter {
  margin-bottom: 20px;
}

.summary {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.no-data-container {
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
}

.receipt-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  justify-content: space-between;
  cursor: pointer;
  background-color: #dfeff6;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 300%;
  max-width: 1200px; /* 목록 너비를 넓힙니다 */
  
}

.receipt-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.receipt-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}

.receipt-text p {
  margin: 0;
}

.payment {
  font-weight: bold;
  font-size: 16px;
}

.amount {
  font-weight: bold;
  font-size: 20px;
  text-align: right;
}

.date {
  color: #888;
  font-size: 14px;
}

.total {
  color: #888;
  font-size: 14px;
  text-align: right;
}

.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.delete-icon {
  width: 30px;
  height: 30px;
}

.option-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  margin: 10px 10px;
}

.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #007bff;
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
}
</style>