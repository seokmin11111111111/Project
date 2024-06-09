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
        <div class="buttons">
          <button @click="shareReceipt(receipt)">공유하기</button>
          <button @click="editReceipt(receipt.id)" class="edit-button">수정하기</button>
          <button @click="deleteReceipt(receipt.id)" class="delete-button">삭제하기</button>
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
    },
    shareReceipt(receipt) {
      alert(`영수증을 공유합니다: ${receipt.payment}`);
    },
    editReceipt(receiptId) {
      this.$router.push({ name: 'ReceiptForm', params: { id: receiptId } });
    },
    deleteReceipt(receiptId) {
      this.$emit('delete-receipt', receiptId);
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
  margin-bottom: 10px; /* 추가 */
}

.receipt-date {
  font-size: 12px;
}

.receipt-total {
  font-size: 12px;
}

.buttons {
  display: flex;
  justify-content: space-between; /* 중앙 정렬을 위해 수정 */
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex-grow: 1; /* 버튼 크기를 같게 만듦 */
  margin: 0 5px; /* 버튼 사이 간격 추가 */
}

button:hover {
  background-color: #0056b3;
}

.edit-button {
  background-color: #ffc107;
}

.edit-button:hover {
  background-color: #e0a800;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
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
