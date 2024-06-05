<template>
  <div class="receipt-form">
    <div class="form-header">
      <h2>{{ isEditMode ? '편집' : '새 영수증' }}</h2>
      <button @click="saveReceipt">저장</button>
    </div>
    <div class="form-content">
      <div class="form-group">
        <label for="amount">금액 (필수)</label>
        <input v-model="receipt.amount" type="text" id="amount" placeholder="금액을 입력하세요(￦)">
      </div>
      <div class="form-group">
        <label for="date">날짜 (필수)</label>
        <input v-model="receipt.date" type="date" id="date">
      </div>
      <div class="form-group">
        <label for="category">구분 (필수)</label>
        <select v-model="receipt.category" id="category">
          <option value="">구분 항목을 선택하세요</option>
          <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="detail">비목 (필수)</label>
        <input v-model="receipt.detail" type="text" id="detail" placeholder="비목을 선택하세요">
      </div>
      <div class="form-group">
        <label for="payment">지출처</label>
        <input v-model="receipt.payment" type="text" id="payment" placeholder="지출처를 입력하세요">
      </div>
      <div class="form-group">
        <label for="purpose">목적</label>
        <input v-model="receipt.purpose" type="text" id="purpose" placeholder="목적을 입력하세요">
      </div>
      <div class="form-group">
        <label for="item">품목</label>
        <input v-model="receipt.item" type="text" id="item" placeholder="품목을 입력하세요">
      </div>
      <div class="form-group">
        <label for="memo">메모</label>
        <textarea v-model="receipt.memo" id="memo" placeholder="간단한 메모를 입력하세요"></textarea>
      </div>
      <div class="form-group">
        <button @click="saveReceipt" class="save-button">저장</button>
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
        detail: '',
        payment: '',
        purpose: '',
        item: '',
        memo: ''
      },
      categories: []
    };
  },
  computed: {
    ...mapGetters(['getReceiptById']),
    currentReceipt() {
      const id = this.$route.params.id;
      return id !== undefined ? this.getReceiptById(id) : null;
    },
    isEditMode() {
      return this.$route.params.id !== undefined;
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
      this.$router.push('/');
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
        detail: '',
        payment: '',
        purpose: '',
        item: '',
        memo: ''
      };
    },
    loadCategories() {
      const storedCategories = JSON.parse(localStorage.getItem('categories'));
      if (storedCategories) {
        this.categories = storedCategories;
      }
    }
  },
  watch: {
    currentReceipt: 'setReceiptData',
    '$route.params.selectedCategory'(newCategory) {
      if (newCategory) {
        this.receipt.category = newCategory;
      }
    }
  },
  created() {
    this.setReceiptData();
    if (this.$route.params.selectedCategory) {
      this.receipt.category = this.$route.params.selectedCategory;
    }
  },
  mounted() {
    this.loadCategories();
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

.form-header button {
  padding: 5px 10px;
  background-color: #708ca3;
  color: white;
  border: none;
  border-radius: 5px;
}

.form-content {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
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
}

.save-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #708ca3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>