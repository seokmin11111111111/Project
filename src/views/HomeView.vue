<template>
  <div class="home-content">
    <div class="header">
      <h1 @click="refreshPage">RECEIPT KEEPER</h1>
      <div class="auth-buttons">
        <button v-if="!isAuthenticated" class="auth-button" @click="goToLogin">로그인</button>
        <button v-else class="auth-button" @click="logout">로그아웃</button>
      </div>
    </div>
    <div class="main-content">
      <div class="month-filter">
        <label for="filter-month">월 선택:</label>
        <input type="month" id="filter-month" v-model="filterMonth" @change="filterReceiptsByMonth" />
      </div>
      <div v-if="filteredReceipts.length === 0" class="no-data-container">
        <p class="no-data-message">영수증 데이터가 없습니다.<br />"+"버튼을 눌러 영수증 내역을 등록해보세요.</p>
        <router-link to="/form/new" class="add-button">+</router-link>
      </div>
      <transition-group name="shrink-fade" tag="div" class="receipts-list">
        <div
          v-for="(receipt, index) in filteredReceipts"
          :key="receipt.id"
          class="receipt-item"
          @click="selectReceipt(index)"
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
      </transition-group>
    </div>
    <router-link to="/form/new" class="add-button">+</router-link>
    
    <transition name="modal">
      <div v-if="selectedReceipt !== null" class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
          <p>목록을 삭제 또는 수정하시겠습니까?</p>
          <button @click="handleDeleteReceipt(selectedReceipt)" class="option-button">삭제하기</button>
          <button @click="goToDetail(selectedReceipt)" class="option-button">수정하기</button>
        </div>
      </div>
    </transition>
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
      selectedReceipt: null, // 선택된 영수증의 인덱스를 저장
    };
  },
  computed: {
    ...mapGetters(['receipts', 'isAuthenticated'])
  },
  methods: {
    ...mapActions(['deleteReceipt', 'logout']),
    handleDeleteReceipt(index) {
      this.deleteReceipt(index);
      this.filterReceiptsByMonth(); // 삭제 후 필터링 갱신
      this.selectedReceipt = null; // 선택된 영수증 해제
    },
    goToDetail(index) {
      this.$router.push(`/form/${index}`);
      this.selectedReceipt = null; // 모달 닫기
    },
    refreshPage() {
      window.location.reload();
    },
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      this.logout();
      this.$router.push('/login');
    },
    filterReceiptsByMonth() {
      const month = this.filterMonth;
      this.filteredReceipts = this.receipts
        .filter(receipt => receipt.date.startsWith(month))
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜 오름차순 정렬
    },
    selectReceipt(index) {
      this.selectedReceipt = index;
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
  justify-content: center; /* 가운데 정렬 */
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
  text-align: center; /* 중앙 정렬 */
  flex: 1; /* 남은 공간을 채움 */
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
  padding-bottom: 80px; /* 하단 고정된 요소와 겹치지 않도록 추가 */
}

.month-filter {
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
  background-color: #dfeff6;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  width: 100%; /* 가로 길이 100%로 설정 */
  max-width: 800px; /* 최대 가로 길이 설정 */
  margin: 0 300px; /* 양 옆의 여백을 균등하게 설정 */
  transition: transform 0.3s ease;
}

.shrink-fade-enter-active, .shrink-fade-leave-active {
  transition: all 0.5s ease;
}

.shrink-fade-enter, .shrink-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
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
  background-color: transparent; /* 버튼 배경 투명으로 변경 */
  border: none;
  cursor: pointer;
  padding: 0; /* 패딩 제거 */
}

.delete-icon {
  width: 30px; /* 아이콘 크기 조정 */
  height: 30px;
}

.option-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px; /* 둥근 모양으로 변경 */
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  margin: 10px 10px; /* 간격 조정 */
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
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>