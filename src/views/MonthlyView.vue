<template>
  <div class="monthly-view">
    <div class="month-navigation">
      <button @click="previousMonth"> &lt; </button>
      <h1>{{ formattedMonth }}</h1>
      <button @click="nextMonth"> &gt; </button>
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
    <button @click="viewCardUsage" class="usage-button">카드사용내역</button>
    <div class="limit-setting">
      <h3 @click="toggleLimitSetting" class="limit-setting-toggle">잔여 한도 설정하기</h3>
      <div v-if="showLimitSetting" class="limit-setting-form">
        <input v-model="formattedNewLimit" @input="formatNewLimit" type="text" placeholder="잔여 한도 입력" />
        <button @click="setLimit" class="set-limit-button">설정</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MonthlyView',
  data() {
    return {
      cardImageUrl: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fobj-kr.the1.wiki%2Fd%2F31%2Fb2%2F55800c2b8099e6bb4c959a442f5f20fabd6f3f592b2cbb0ae69a43d557f2b5c1.png&type=sc960_832',
      newLimit: 0,
      showLimitSetting: false,
      currentMonth: new Date() // 현재 월을 저장
    };
  },
  computed: {
    ...mapGetters(['getTotalAmountByMonth']),
    thisMonthUsage() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth() + 1;
      return this.getTotalAmountByMonth(year, month);
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
    remainingLimit() {
      const yearMonth = `${this.currentMonth.getFullYear()}-${this.currentMonth.getMonth() + 1}`;
      const storedLimit = localStorage.getItem(`remainingLimit-${yearMonth}`);
      return storedLimit !== null ? Number(storedLimit) : 0;
    },
    remainingLimitAfterUsage() {
      return this.remainingLimit - this.thisMonthUsage;
    }
  },
  methods: {
    ...mapActions(['saveRemainingLimit']),
    viewCardUsage() {
      alert('카드 사용내역 보기');
    },
    toggleLimitSetting() {
      this.showLimitSetting = !this.showLimitSetting;
    },
    setLimit() {
      const yearMonth = `${this.currentMonth.getFullYear()}-${this.currentMonth.getMonth() + 1}`;
      localStorage.setItem(`remainingLimit-${yearMonth}`, this.newLimit);
      alert(`잔여 한도가 ${this.newLimit.toLocaleString()} 원으로 설정되었습니다.`);
      this.showLimitSetting = false;
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
  background-color: #f9f9f9;
  border-radius: 10px;
  height: 100%;
  width: 100%; /* 화면 전체 너비 설정 */
  box-sizing: border-box; /* 박스 크기 계산에 패딩과 테두리를 포함 */
}

.month-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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

.usage-button {
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

.usage-button:hover {
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
</style>
