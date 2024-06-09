<template>
  <div class="start-view">
    <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.freepik.com%2F256%2F11014%2F11014477.png&type=sc960_832" alt="Animated GIF" class="animated-gif" />
    <h1 class="animated-texts">
      <span class="animated-text" :class="{ show: showFirst }">Make a note</span>
      <span class="animated-text" :class="{ show: showSecond }">of the</span>
      <span class="animated-text highlight" :class="{ show: showThird }">receipt!</span>
    </h1>
    <router-link to="/login" class="login-button">
      <span class="button-text">로그인</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'StartView',
  data() {
    return {
      showFirst: false,
      showSecond: false,
      showThird: false,
    };
  },
  mounted() {
    this.animateText();
    setInterval(this.animateText, 4000); // 전체 애니메이션 반복
  },
  methods: {
    animateText() {
      this.showFirst = this.showSecond = this.showThird = false;
      setTimeout(() => {
        this.showFirst = true;
      }, 0);
      setTimeout(() => {
        this.showSecond = true;
      }, 500);
      setTimeout(() => {
        this.showThird = true;
      }, 1000);
      setTimeout(() => {
        this.showFirst = this.showSecond = this.showThird = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.start-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.animated-gif {
  width: 150px; /* 이미지 크기를 조정하세요 */
  height: auto;
  margin-bottom: 20px; /* 텍스트와 이미지 사이의 간격 조정 */
}

h1 {
  font-size: 48px;
  font-weight: bold;
  margin: 20px 0;
}

h1 span {
  display: block;
  opacity: 0; /* 초기 상태를 보이지 않게 설정 */
}

h1 .highlight {
  color: #4a90e2;
}

.animated-texts {
  animation: textFade 4s infinite;
}

.animated-text.show {
  animation: fadeInUp 0.5s forwards;
}

.login-button {
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #007bff;
  border: 2px solid #007bff; /* 파란색 테두리 추가 */
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-top: 20px; /* 버튼과 텍스트 사이에 간격 추가 */
}

.login-button:hover {
  background-color: #0056b3;
  color: #fff;
}

.button-text {
  position: relative;
  z-index: 1;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: skewX(-20deg);
  animation: slide 2s infinite;
}

@keyframes slide {
  0% {
    left: -50%;
  }
  50% {
    left: 150%;
  }
  100% {
    left: -50%;
  }
}

/* 추가된 스타일 */
.start-view .list-button,
.start-view .stats-button,
.start-view .settings-button {
  display: none;
}
</style>
