<template>
    <div v-if="receipt" class="receipt-detail-container">
      <h2>영수증</h2>
      <div class="receipt-detail">
        <p>날짜: {{ receipt.date }}</p>
        <h3>지출처: {{ receipt.payment }}</h3>
        <h1>금액: {{ formatCurrency(receipt.amount) }} 원</h1>
        <div class="receipt-amounts">
          <p>카테고리: {{ receipt.category }}</p>
          <p>품목: {{ receipt.item }}</p>
          <p>메모: {{ receipt.memo }}</p>
        </div>
        <div class="buttons">
          <button @click="shareReceipt">공유하기</button>
          <button @click="editReceipt" class="edit-button">수정하기</button>
          <button @click="deleteReceipt" class="delete-button">삭제하기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReceiptDetail',
    props: {
      receipt: {
        type: Object,
        default: () => ({
          date: '',
          cardInfo: '',
          amount: 0,
          category: '',
          payment: '',
          item: '',
          memo: ''
        })
      }
    },
    methods: {
      formatCurrency(value) {
        return value ? value.toLocaleString() : '0';
      },
      shareReceipt() {
        alert('영수증을 공유합니다.');
      },
      editReceipt() {
        this.$emit('edit-receipt', this.receipt.id);
        this.$router.push({ name: 'ReceiptForm', params: { id: this.receipt.id } });
      },
      deleteReceipt() {
        this.$emit('delete-receipt', this.receipt.id);
      }
    }
  }
  </script>
  
  <style scoped>
  .receipt-detail-container {
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 600px;
    margin: 0 auto;
  }
  
  .receipt-detail {
    text-align: left;
  }
  
  .receipt-detail h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .receipt-detail h3 {
    font-size: 24px;
    margin-bottom: 5px;
  }
  
  .receipt-detail h1 {
    font-size: 32px;
    color: #ff6600;
    margin-bottom: 10px;
  }
  
  .receipt-detail p {
    margin: 5px 0;
  }
  
  .receipt-amounts, .receipt-info {
    margin-top: 15px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    flex-grow: 1;
    margin: 0 5px;
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
  </style>
  