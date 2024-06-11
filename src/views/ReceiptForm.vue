<template>
  <div class="receipt-form">
    <h2>{{ isEditMode ? 'Receipt Edit' : 'Receipt Entry' }}</h2>
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
        <input v-model="receipt.date" type="date" id="date" @change="updateMonth" required>
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
      <button @click="goBack" class="back-button">Back</button>
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
        amount: '',
        date: '',
        category: '',
        payment: '',
        paymentMethod: '', // Add paymentMethod here
        item: '',
        memo: '',
        month: ''
      },
      categories: [] // Initialize categories as empty array
    };
  },
  computed: {
    ...mapGetters(['getReceiptById']),
    currentReceipt() {
      const id = this.$route.params.id;
      return id && id !== 'new' ? this.getReceiptById(id) : null;
    },
    isEditMode() {
      return this.$route.params.id && this.$route.params.id !== 'new';
    },
    formattedAmount: {
      get() {
        return this.receipt.amount ? this.receipt.amount.toLocaleString() : '';
      },
      set(value) {
        this.receipt.amount = value.replace(/,/g, '');
      }
    }
  },
  methods: {
    ...mapActions(['addReceipt', 'updateReceipt']),
    saveReceipt() {
      if (this.isEditMode) {
        this.updateReceipt({ index: this.$route.params.id, receipt: this.receipt });
      } else {
        this.addReceipt(this.receipt);
      }
      this.$router.push('/home'); // Navigate to home view
    },
    setReceiptData() {
      if (this.currentReceipt) {
        this.receipt = { ...this.currentReceipt };
      } else {
        this.resetForm();
      }
    },
    resetForm() {
      this.receipt = {
        amount: '',
        date: '',
        category: '',
        payment: '',
        paymentMethod: '', // Reset paymentMethod
        item: '',
        memo: '',
        month: ''
      };
    },
    goBack() {
      this.$router.go(-1);
    },
    formatAmount(event) {
      const value = event.target.value.replace(/,/g, '');
      if (!isNaN(value)) {
        this.formattedAmount = parseInt(value, 10).toLocaleString();
      }
    },
    loadCategories() {
      const storedCategories = JSON.parse(localStorage.getItem('categories'));
      if (storedCategories) {
        this.categories = storedCategories;
      }
    },
    updateMonth() {
      if (this.receipt.date) {
        const date = new Date(this.receipt.date);
        const month = date.getMonth() + 1; // months are zero-indexed
        const year = date.getFullYear();
        this.receipt.month = `${year}-${month < 10 ? '0' + month : month}`; // format as YYYY-MM
      }
    }
  },
  watch: {
    currentReceipt: 'setReceiptData'
  },
  created() {
    this.setReceiptData();
    this.loadCategories(); // Load categories on component creation
  }
};
</script>

<style scoped>
.receipt-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.form-content {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px; /* 추가된 여유 공간 */
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
  border-radius: 20px; /* 입력 필드, 선택 박스, 텍스트 영역 둥글게 */
  box-sizing: border-box;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
  height: 100px;
}

.save-button,
.back-button {
  padding: 10px;
  border: none;
  border-radius: 20px; /* 버튼 둥글게 */
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.save-button {
  background-color: #007bff;
  color: white;
  margin-bottom: 10px; /* 저장 버튼과 뒤로 가기 버튼 간격 */
}

.save-button:hover {
  background-color: #0056b3; /* 호버 색상 추가 */
}

.back-button {
  background-color: grey;
  color: white;
}

.back-button:hover {
  background-color: #555; /* 호버 색상 추가 */
}
</style>