<template>
  <div class="container">
    <div class="header">
      <h3>통계</h3>
      
    </div>
    <div class="stats">
      <input type="date" v-model="startDate" @change="updateDate" />
      <input type="date" v-model="endDate" @change="updateDate" />
      <span>ALL</span>
      <span>{{ total }}원</span>
    </div>
    <div class="chart">
      <DoughnutChart :data="chartData" :options="chartOptions" />
    </div>
    <div class="list">
      <div class="list-item">
        <div class="color-box"></div>
        <div class="label">비목1</div>
        <div class="amount">0원</div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-button">
        
      </div>
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'StatsView',
  components: {
    DoughnutChart: Doughnut
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      total: 0,
      chartData: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            data: [30, 40, 30],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    }
  },
  methods: {
    updateDate() {
      console.log(`Selected Date Range: ${this.startDate} - ${this.endDate}`)
      // 여기서 데이터를 업데이트하는 로직을 추가할 수 있습니다.
    }
  }
}
</script>

<style scoped>
.container {
  width: 375px;
  margin: 0 auto;
  padding-top: 20px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}
.header {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.filter-button {
  position: absolute;
  right: 20px;
  top: 0;
  background-color: #57b9ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
}
.stats {
  text-align: center;
  margin-bottom: 20px;
}
.stats span {
  display: block;
}
.stats input[type="date"] {
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
}
.chart {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 20px auto;
}
.list {
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 10px;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.list-item .color-box {
  width: 20px;
  height: 20px;
  background-color: #324e7b;
  margin-right: 10px;
}
.list-item .label {
  flex: 1;
  color: #4f4f4f;
}
.list-item .amount {
  color: #4f4f4f;
}
.footer {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.footer-button {
  text-align: center;
}
.footer-button img {
  display: block;
  margin: 0 auto;
  width: 24px;
  height: 24px;
}
.footer-button span {
  font-size: 12px;
}
</style>