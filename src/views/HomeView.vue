<template>
  <div class="home-content">
    <div class="header">
      <h1 @click="refreshPage">RECEIPT KEEPER</h1>
      <div class="auth-buttons">
        <button class="auth-button" @click="goToLogin">로그인</button>
      </div>
    </div>
    <div class="main-content">
      <div class="month-filter">
        <label for="filter-month">월 선택:</label>
        <input type="month" id="filter-month" v-model="filterMonth" @change="filterReceiptsByMonth" />
      </div>
      <p v-if="filteredReceipts.length === 0" class="no-data-message">영수증 데이터가 없습니다.<br />"+"버튼을 눌러 영수증 내역을 등록해보세요.</p>
      <router-link v-if="filteredReceipts.length === 0" to="/form/new" class="add-button">+</router-link>
      <div v-else class="receipts-list">
        <div
          v-for="(receipt, index) in filteredReceipts"
          :key="index"
          class="receipt-item"
          @click="goToDetail(index)"
        >
          <div class="receipt-info">
            <div class="receipt-text">
              <p class="payment" v-if="receipt.payment">{{ receipt.payment }}</p>
              <p class="amount" v-if="receipt.amount">{{ (receipt.amount || 0).toLocaleString() }}원</p>
              <p class="date">{{ receipt.date }}</p>
              <p class="total" v-if="receipt.totalAmount">{{ (receipt.totalAmount || 0).toLocaleString() }}원</p>
            </div>
            <button class="delete-button" @click.stop="handleDeleteReceipt(index)">삭제</button>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/form/new" class="add-button">+</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {
      filterMonth: new Date().toISOString().substr(0, 7), // 현재 월을 기본값으로 설정
      filteredReceipts: [],
    };
  },
  computed: {
    ...mapGetters(['receipts'])
  },
  methods: {
    ...mapActions(['deleteReceipt']),
    handleDeleteReceipt(index) {
      this.deleteReceipt(index);
      this.filterReceiptsByMonth(); // 삭제 후 필터링 갱신
    },
    goToDetail(index) {
      this.$router.push(`/form/${index}`);
    },
    refreshPage() {
      window.location.reload();
    },
    goToLogin() {
      this.$router.push('/login');
    },
    filterReceiptsByMonth() {
      const month = this.filterMonth;
      this.filteredReceipts = this.receipts
        .filter(receipt => receipt.date.startsWith(month))
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜 오름차순 정렬
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
  text-align: left; /* 왼쪽 정렬 */
}

.auth-buttons {
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
  padding-bottom: 80px; /* 하단 고정된 요소와 겹치지 않도록 추가 */
}

.month-filter {
  margin-bottom: 20px;
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
  align-items: center; /* 리스트를 가운데 정렬 */
  max-height: calc(100vh - 140px); /* 스크롤 영역의 최대 높이 설정 */
}

.receipt-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px; /* 둥근 테두리로 변경 */
  justify-content: space-between;
  cursor: pointer;
  background-color: #f7f7f7;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  width: 100%; /* 가로 길이 100%로 설정 */
  max-width: 800px; /* 최대 가로 길이 설정 */
  margin: 0 300px; /* 양 옆의 여백을 균등하게 설정 */
  transition: transform 0.3s ease;
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

.arrow-icon {
  font-size: 20px;
  color: #ccc;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
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
</style>