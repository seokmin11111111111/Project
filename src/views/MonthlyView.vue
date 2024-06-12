<template>
  <div class="monthly-view">
    <div class="header">
      <div class="month-navigation">
        <button @click="previousMonth"> &lt; </button>
        <h1>{{ formattedMonth }}</h1>
        <button @click="nextMonth"> &gt; </button>
      </div>
      <button @click="goToCardManagement" class="card-management-button">카드등록</button>
    </div>
    <div class="card-info">
      <img :src="cardImageUrl" alt="Card Image" class="card-image" />
      <div class="card-details">
        <p>이달의 사용금액</p>
        <h2>{{ thisMonthUsage.toLocaleString() }} 원</h2>
        <p>잔여 한도</p>
        <h2>{{ remainingLimit.toLocaleString() }} 원</h2>
        <p>남은 잔여 한도</p>
        <h2>{{ remainingLimitAfterUsage.toLocaleString() }} 원</h2>
      </div>
    </div>
    <div class="limit-setting">
      <h3 @click="toggleLimitSetting" class="limit-setting-toggle">잔여 한도 설정하기</h3>
      <div v-if="showLimitSetting" class="limit-setting-form">
        <input v-model="formattedNewLimit" @input="formatNewLimit" type="text" placeholder="잔여 한도 입력" />
        <button @click="setLimit" class="set-limit-button">설정</button>
      </div>
    </div>
    <button @click="toggleCardUsage" class="view-usage-button">카드사용내역</button>
    <div v-if="showCardUsage" class="card-usage">
      <h2>내역</h2>
      <div class="transaction" v-for="(transaction, index) in monthlyTransactions" :key="transaction.id">
        <div class="transaction-details">
          <p class="transaction-name">{{ transaction.payment }}</p>
          <p class="transaction-date">{{ transaction.date }}</p>
        </div>
        <div class="transaction-amount">
          <p>{{ transaction.amount ? transaction.amount.toLocaleString() : 0 }} 원</p>
          <p class="transaction-balance">{{ calculateRemainingLimit(index).toLocaleString() }} 원</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MonthlyView',
  props: {
    transactions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      cardImageUrl: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fobj-kr.the1.wiki%2Fd%2F31%2Fb2%2F55800c2b8099e6bb4c959a442f5f20fabd6f3f592b2cbb0ae69a43d557f2b5c1.png&type=sc960_832',
      newLimit: 0,
      showLimitSetting: false,
      showCardUsage: false,
      currentMonth: new Date(), // 현재 월을 저장
      remainingLimit: 0, // 잔여 한도를 데이터로 저장
    };
  },
  computed: {
    ...mapGetters(['receipts']),
    thisMonthUsage() {
      return this.monthlyTransactions.reduce((total, transaction) => total + Number(transaction.amount || 0), 0); // Number()로 변환
    },
    formattedNewLimit: {
      get() {
        return this.newLimit ? `${this.newLimit.toLocaleString()} 원` : '';
      },
      set(value) {
        const numericValue = value.replace(/[^0-9]/g, '');
        this.newLimit = Number(numericValue);
      }
    },
    formattedMonth() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth() + 1;
      return `${year}년 ${month < 10 ? '0' + month : month}월`;
    },
    remainingLimitAfterUsage() {
      return this.remainingLimit - this.thisMonthUsage;
    },
    monthlyTransactions() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth() + 1;
      return this.receipts
        .filter(transaction => transaction && transaction.date) // date가 존재하는 경우만 필터링
        .filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return transactionDate.getFullYear() === year && transactionDate.getMonth() + 1 === month;
        });
    }
  },
  watch: {
    currentMonth: {
      immediate: true,
      handler() {
        this.updateRemainingLimit();
      }
    }
  },
  methods: {
    toggleCardUsage() {
      this.showCardUsage = !this.showCardUsage;
    },
    toggleLimitSetting() {
      this.showLimitSetting = !this.showLimitSetting;
    },
    setLimit() {
      const yearMonth = `${this.currentMonth.getFullYear()}-${this.currentMonth.getMonth() + 1}`;
      localStorage.setItem(`remainingLimit-${yearMonth}`, this.newLimit);
      alert(`잔여 한도가 ${this.newLimit.toLocaleString()} 원으로 설정되었습니다.`);
      this.showLimitSetting = false;
      this.updateRemainingLimit(); // 잔여 한도를 업데이트
    },
    formatNewLimit(event) {
      const value = event.target.value.replace(/[^0-9]/g, '');
      this.newLimit = Number(value);
    },
    previousMonth() {
      this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() - 1));
    },
    nextMonth() {
      this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + 1));
    },
    updateRemainingLimit() {
      const yearMonth = `${this.currentMonth.getFullYear()}-${this.currentMonth.getMonth() + 1}`;
      const storedLimit = localStorage.getItem(`remainingLimit-${yearMonth}`);
      this.remainingLimit = storedLimit !== null ? Number(storedLimit) : 0;
    },
    calculateRemainingLimit(index) {
      const usedAmount = this.monthlyTransactions.slice(0, index + 1)
        .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);
      return this.remainingLimit - usedAmount;
    },
    goToCardManagement() {
      this.$router.push('/card-management');
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9; /* 전체 배경색 설정 */
}

#app {
  height: 100%;
}

.monthly-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom: 80px; /* 버튼에 가려지지 않도록 패딩 추가 */
  background-color: #f9f9f9;
  border-radius: 10px;
  height: 100%;
  width: 100%; /* 화면 전체 너비 설정 */
  box-sizing: border-box; /* 박스 크기 계산에 패딩과 테두리를 포함 */
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.month-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

.month-navigation h1 {
  margin: 0 20px;
  font-size: 24px;
}

.month-navigation button {
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
}

.card-management-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.card-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.card-image {
  width: 300px;
  height: 180px;
  border-radius: 10px;
  margin-right: 20px;
}

.card-details {
  flex-grow: 1;
}

.card-details p {
  margin: 0;
  font-size: 16px;
  color: #666;
}

.card-details h2 {
  margin: 10px 0;
  font-size: 24px;
  color: #333;
}

.usage-button, .view-usage-button {
  display: block;
  width: 50%; /* 너비를 줄여서 화면 중앙 정렬 */
  max-width: 200px; /* 최대 너비 설정 */
  padding: 15px;
  margin: 20px auto; /* 자동으로 여백을 주어 중앙 정렬 */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
}

.usage-button:hover, .view-usage-button:hover, .card-management-button:hover {
  background-color: #0056b3;
}

.limit-setting {
  margin-top: 20px;
  text-align: center;
}

.limit-setting h3 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
  cursor: pointer;
}

.limit-setting-form {
  margin-top: 10px;
}

.limit-setting input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
}

.limit-setting .set-limit-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.limit-setting .set-limit-button:hover {
  background-color: #0056b3;
}

.card-usage {
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-usage h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.transaction {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.transaction:last-child {
  border-bottom: none;
}

.transaction-details {
  display: flex;
  flex-direction: column;
}

.transaction-name {
  font-size: 18px;
  font-weight: bold;
}

.transaction-date {
  font-size: 14px;
  color: #999;
}

.transaction-amount {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.transaction-amount p {
  margin: 0;
}

.transaction-balance {
  color: #999;
}
</style>
