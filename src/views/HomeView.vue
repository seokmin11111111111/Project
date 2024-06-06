<template>
  <div class="home-content">
    <div class="header">
      <h1 @click="refreshPage">RECEIPT KEEPER</h1>
      <div class="auth-buttons">
        <button class="auth-button" @click="goToLogin">로그인</button>
      </div>
    </div>
    <div class="main-content">
      <p v-if="receipts.length === 0" class="no-data-message">영수증 데이터가 없습니다.<br />"+"버튼을 눌러 영수증 내역을 등록해보세요.</p>
      <router-link v-if="receipts.length === 0" to="/form/new" class="add-button">+</router-link>
      <div v-else class="receipts-list">
        <div
          v-for="(receipt, index) in receipts"
          :key="index"
          class="receipt-item"
          :ref="'receipt' + index"
          @mousedown="startDrag(index, $event)"
          @touchstart="startDrag(index, $event)"
          @mousemove="onDrag(index, $event)"
          @touchmove="onDrag(index, $event)"
          @mouseup="endDrag(index, $event)"
          @touchend="endDrag(index, $event)"
          @mouseleave="endDrag(index, $event)"
        >
          <div class="receipt-info">
            <div class="receipt-text">
              <p class="payment" v-if="receipt.payment">{{ receipt.payment }}</p>
              <p class="amount" v-if="receipt.amount">{{ (receipt.amount || 0).toLocaleString() }}원</p>
              <p class="date">{{ receipt.date }}</p>
              <p class="total" v-if="receipt.totalAmount">{{ (receipt.totalAmount || 0).toLocaleString() }}원</p>
            </div>
            <div class="trash-can" @click.stop="handleDeleteReceipt(index)"></div>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/form/new" class="add-button">+</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {
      draggingIndex: null,
      startX: 0,
      currentX: 0,
    };
  },
  computed: {
    ...mapGetters(['receipts'])
  },
  methods: {
    ...mapActions(['deleteReceipt']),
    handleDeleteReceipt(index) {
      this.deleteReceipt(index);
    },
    goToDetail(index) {
      this.$router.push(`/form/${index}`);
    },
    refreshPage() {
      window.location.reload();
    },
    goToLogin() {
      this.$router.push('/login');
    },
    startDrag(index, event) {
      this.draggingIndex = index;
      this.startX = event.touches ? event.touches[0].clientX : event.clientX;
      this.currentX = this.startX;
    },
    onDrag(index, event) {
      if (this.draggingIndex === index) {
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        this.currentX = clientX;
        const translateX = Math.min(0, this.currentX - this.startX);
        this.$refs[`receipt${index}`][0].style.transform = `translateX(${translateX}px)`;
      }
    },
    endDrag(index, event) {
      if (this.draggingIndex === index) {
        const deltaX = this.currentX - this.startX;
        const receiptElement = this.$refs[`receipt${index}`][0];
        if (deltaX < -100) {
          receiptElement.style.transform = `translateX(-100%)`;
          receiptElement.classList.add('swiped');
        } else {
          receiptElement.style.transform = `translateX(0)`;
          receiptElement.classList.remove('swiped');
        }
        this.draggingIndex = null;
        this.startX = 0;
        this.currentX = 0;
      }
    }
  }
};
</script>

<style scoped>
.home-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 24px;
  color: black;
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.main-content {
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.no-data-message {
  color: grey;
  margin-top: 20px;
  font-size: 16px;
}

.receipts-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center; /* 리스트를 가운데 정렬 */
}

.receipt-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px; /* 둥근 테두리로 변경 */
  justify-content: space-between;
  cursor: pointer;
  background-color: #f7f7f7;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  width: 100%; /* 가로 길이 100%로 설정 */
  max-width: 800px; /* 최대 가로 길이 설정 */
  margin: 0 300px; /* 양 옆의 여백을 균등하게 설정 */
  transition: transform 0.3s ease;
}

.receipt-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.receipt-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}

.receipt-text p {
  margin: 0;
}

.payment {
  font-weight: bold;
  font-size: 16px;
}

.amount {
  font-weight: bold;
  font-size: 20px;
  text-align: right;
}

.date {
  color: #888;
  font-size: 14px;
}

.total {
  color: #888;
  font-size: 14px;
  text-align: right;
}

.arrow-icon {
  font-size: 20px;
  color: #ccc;
}

.trash-can {
  width: 24px;
  height: 24px;
  background-image: url('https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Ftrash-bin-icon-in-black-and-white_755164-9737.jpg&type=sc960_832');
  background-size: cover;
  cursor: pointer;
  margin-left: 10px;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.receipt-item.swiped .trash-can {
  opacity: 1;
}

.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}
</style>
