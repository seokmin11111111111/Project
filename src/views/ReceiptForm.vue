<template>
  <div class="receipt-form">
    <div class="form-header">
      <button @click="goBack" class="back-button">↩</button>
      <h2>{{ isEditMode ? '영수증 수정' : '영수증 작성' }}</h2>
      <button @click="saveReceipt" class="save-button">저장</button>
    </div>
    <div class="form-content">
      <div class="form-group">
        <label for="amount">금액 (필수)</label>
        <input
          v-model="formattedAmount"
          @input="formatAmount"
          type="text"
          id="amount"
          placeholder="금액을 입력하세요"
          inputmode="numeric"
          pattern="[0-9,]*"
          required
        />
      </div>
      <div class="form-group">
        <label for="date">날짜 (필수)</label>
        <input v-model="receipt.date" type="date" id="date" required>
      </div>
      <div class="form-group">
        <label for="category">구분 (필수)</label>
        <select v-model="receipt.category" id="category" required>
          <option value="">구분 항목을 선택하세요</option>
          <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="payment">지출처</label>
        <input v-model="receipt.payment" type="text" id="payment" placeholder="지출처를 입력하세요">
      </div>
      <div class="form-group">
        <label for="item">품목</label>
        <input v-model="receipt.item" type="text" id="item" placeholder="품목을 입력하세요">
      </div>
      <div class="form-group">
        <label for="memo">메모</label>
        <textarea v-model="receipt.memo" id="memo" placeholder="간단한 메모를 입력하세요"></textarea>
      </div>
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
        item: '',
        memo: ''
      },
      categories: ['식비', '교통비', '주거비', '기타'], // 샘플 카테고리
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
      this.$router.push('/home'); // 여기서 홈 뷰로 이동
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
        item: '',
        memo: ''
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
    }
  },
  watch: {
    currentReceipt: 'setReceiptData'
  },
  created() {
    this.setReceiptData();
  }
};
</script>

<style scoped>
.receipt-form {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
}

.form-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
}

.form-header h2 {
  margin: 0;
  font-size: 20px;
}

.form-header .back-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.form-header .save-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.form-content {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 15px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group textarea {
  resize: vertical;
  height: 100px;
}
</style>