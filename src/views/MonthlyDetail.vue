<template>
    <div class="monthly-detail">
      <h3>{{ formatMonth(month) }} 영수증</h3>
      <div class="receipt-list">
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
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'MonthlyDetail',
    props: ['month'],
    computed: {
      ...mapGetters(['getReceiptsByMonth']),
      receipts() {
        return this.getReceiptsByMonth[this.month] || [];
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
  .monthly-detail {
    padding: 20px;
    text-align: left;
  }
  
  .receipt-list {
    display: flex;
    flex-direction: column;
  }
  
  .receipt-item {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 10px;
    border-left: 5px solid #007bff; /* Add a blue border on the left */
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
    border-left: 5px solid #f2b32b; /* Add an orange border on the left */
    background-color: #fff;
    border-radius: 10px;
  }
  </style>
  