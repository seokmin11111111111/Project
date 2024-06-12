<template>
  <div class="receipt-form">
    <h2 class="form-title">{{ isEditMode ? 'Receipt Edit' : 'Receipt Entry' }}</h2>
    <div class="form-content">
      <div class="form-group">
        <label for="amount">금액￦(필수)</label>
        <input
          v-model="formattedAmount"
          @input="formatAmount"
          type="text"
          id="amount"
          placeholder="금액을 입력하세요."
          inputmode="numeric"
          pattern="[0-9,]*"
          required
        />
      </div>
      <div class="form-group">
        <label for="date">날짜(필수)</label>
        <input v-model="receipt.date" type="date" id="date" required>
      </div>
      <div class="form-group">
        <label for="category">카테고리 (필수)</label>
        <select v-model="receipt.category" id="category" required>
          <option value=""></option>
          <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="payment">지출처</label>
        <input v-model="receipt.payment" type="text" id="payment" placeholder="">
      </div>
      <div class="form-group">
        <label for="paymentMethod">결제수단</label>
        <input v-model="receipt.paymentMethod" type="text" id="paymentMethod" placeholder="">
      </div>
      <div class="form-group">
        <label for="item">품목</label>
        <input v-model="receipt.item" type="text" id="item" placeholder="">
      </div>
      <div class="form-group">
        <label for="memo">메모</label>
        <textarea v-model="receipt.memo" id="memo" placeholder="작성하기"></textarea>
      </div>
      <button @click="saveReceipt" class="save-button">저장하기</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ReceiptForm',
  data() {
    return {
      receipt: {
        id: 0,
        amount: '',
        date: '',
        category: '',
        payment: '',
        paymentMethod: '',
        item: '',
        memo: '',
      },
      categories: [] // Initialize categories as empty array
    };
  },
  computed: {
    ...mapGetters(['receipts']),
    isEditMode() {
      return this.receipt.id !== 0;
    },
    formattedAmount: {
      get() {
        return this.receipt.amount ? this.receipt.amount.toLocaleString() : '';
      },
      set(value) {
        const numericValue = value.replace(/[^0-9]/g, '');
        this.receipt.amount = numericValue ? parseInt(numericValue, 10) : '';
      }
    }
  },
  methods: {
    ...mapActions(['addReceipt', 'updateReceipt']),
    saveReceipt() {
      if (this.isEditMode) {
        this.updateReceipt(this.receipt);
      } else {
        this.addReceipt({ ...this.receipt, id: Date.now() });
      }
      this.$router.push('/home');
    },
    formatAmount(event) {
      const value = event.target.value.replace(/[^0-9]/g, '');
      this.formattedAmount = value ? parseInt(value, 10).toLocaleString() : '';
    },
    loadCategories() {
      const storedCategories = JSON.parse(localStorage.getItem('categories'));
      if (storedCategories) {
        this.categories = storedCategories;
      }
    },
    setReceiptData(receiptData) {
      this.receipt = receiptData;
    }
  },
  created() {
    this.loadCategories(); // Load categories on component creation
    if (this.$route.params.receipt) {
      this.setReceiptData(this.$route.params.receipt);
    }
  }
};
</script>

<style scoped>
.receipt-form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 스크롤 활성화 */
  max-height: 80vh; /* 최대 높이를 설정하여 스크롤 가능하게 함 */
}

.form-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.form-content {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
  height: 100px;
}

.save-button {
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px; /* 여백 조정 */
  background-color: #28a745;
  color: white;
  font-weight: bold;
}

.save-button:hover {
  background-color: #218838;
}
</style>
