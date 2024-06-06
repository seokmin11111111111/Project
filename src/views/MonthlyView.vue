<template>
  <div class="monthly-view">
    <h3>월별 영수증</h3>
    <div v-for="(receipts, month) in sortedMonthlyReceipts" :key="month" class="month-group">
      <h2 @click="navigateToMonth(month)" class="month-header">{{ formatMonth(month) }}</h2>
      <div v-if="isMonthOpen(month)" class="receipt-list">
        <div v-for="(receipt, index) in receipts" :key="index" class="receipt-item">
          <div class="receipt-info">
            <span class="receipt-payment">{{ receipt.payment }}</span>
            <span class="receipt-amount">{{ (receipt.amount || 0).toLocaleString() }}원</span>
          </div>
          <div class="receipt-details">
            <span class="receipt-date">{{ receipt.date }}</span>
            <span v-if="receipt.totalAmount" class="receipt-total">{{ (receipt.totalAmount || 0).toLocaleString() }}원</span>
          </div>
        </div>
        <div class="monthly-total">
          총 지출: {{ getTotalAmountForMonth(receipts) }}원
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'MonthlyView',
  setup() {
    const openMonths = reactive({});
    const router = useRouter();

    const toggleMonth = (month) => {
      openMonths[month] = !openMonths[month];
    };

    const isMonthOpen = (month) => {
      return openMonths[month];
    };

    const navigateToMonth = (month) => {
      router.push({ name: 'MonthlyDetail', params: { month } });
    };

    return {
      openMonths,
      toggleMonth,
      isMonthOpen,
      navigateToMonth
    };
  },
  computed: {
    ...mapGetters(['getReceiptsByMonth']),
    monthlyReceipts() {
      return this.getReceiptsByMonth;
    },
    sortedMonthlyReceipts() {
      return Object.keys(this.monthlyReceipts)
        .sort((a, b) => new Date(a) - new Date(b))
        .reduce((acc, key) => {
          acc[key] = this.monthlyReceipts[key];
          return acc;
        }, {});
    }
  },
  methods: {
    formatMonth(month) {
      const [year, monthNumber] = month.split('-');
      return `${year}년 ${monthNumber}월`;
    },
    getTotalAmountForMonth(receipts) {
      return receipts.reduce((total, receipt) => total + Number(receipt.amount || 0), 0).toLocaleString();
    }
  }
};
</script>

<style scoped>
.monthly-view {
  padding: 20px;
  text-align: left;
  max-width: 1200px; /* Adjust the maximum width as needed */
  margin: 0 auto; /* Center the container horizontally */
}

.month-group {
  margin-bottom: 20px;
}

.month-header {
  font-size: 18px;
  color: #333;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
  width: 100%; /* Make the header full width */
  display: block; /* Ensure the header is a block element */
}

.receipt-list {
  display: flex;
  flex-direction: column;
  width: 100%; /* Make the list full width */
}

.receipt-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 10px;
  border-left: 5px solid #007bff; 
  width: 100%; 
}

.receipt-info {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 5px;
}

.receipt-payment {
  color: #333;
}

.receipt-amount {
  color: #333;
}

.receipt-details {
  display: flex;
  justify-content: space-between;
  color: #888;
}

.receipt-date {
  font-size: 12px;
}

.receipt-total {
  font-size: 12px;
}

.monthly-total {
  font-weight: bold;
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  padding: 10px;
  border-left: 5px solid #f2b32b; 
  background-color: #fff;
  border-radius: 10px;
  width: 100%; 
}
</style>
