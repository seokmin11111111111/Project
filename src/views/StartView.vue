<template>
  <div class="start-view">
    <h1 class="animated-texts">
      <span class="animated-text">Make a note</span>
      <span class="animated-text">of the</span>
      <span class="animated-text highlight">receipt!</span>
    </h1>
    <router-link to="/home" class="start-button">
      <span class="button-text">시작하기</span>
    </router-link>
    
    
  </div>
</template>

<script>
export default {
  name: 'StartView'
};
</script>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  33% {
    opacity: 1;
    transform: translateY(0);
  }
  66% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

@keyframes sparkle {
  0%, 100% {
    box-shadow: 0 0 10px rgba(74, 144, 226, 0.7), 0 0 20px rgba(74, 144, 226, 0.5), 0 0 30px rgba(74, 144, 226, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(74, 144, 226, 0.9), 0 0 30px rgba(74, 144, 226, 0.7), 0 0 40px rgba(74, 144, 226, 0.5);
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

h1 {
  font-size: 48px;
  font-weight: bold;
  margin: 20px 0;
}

h1 span {
  display: block;
}

h1 .highlight {
  color: #4a90e2;
}

.animated-texts {
  animation: textFade 6s infinite;
}

.animated-text {
  opacity: 0;
  animation: fadeInUp 2s infinite;
}

.animated-text:nth-child(1) {
  animation-delay: 0s;
}

.animated-text:nth-child(2) {
  animation-delay: 2s;
}

.animated-text:nth-child(3) {
  animation-delay: 4s;
}

@keyframes textFade {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
}

.start-button {
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
}

.start-button:hover {
  background-color: #0056b3;
  color: #fff;
}

.button-text {
  position: relative;
  z-index: 1;
}

.start-button::before {
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