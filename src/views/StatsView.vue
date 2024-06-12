<template>
  <div class="container">
    <div class="header">
      <button @click="goBack" class="back-button">↩</button>
      <h3>통계</h3>
    </div>
    <div class="stats">
      <input type="date" v-model="startDate" @change="updateDate" />
      <input type="date" v-model="endDate" @change="updateDate" />
      <span>{{ startDate }} ~ {{ endDate }}</span>
    </div>
    <div v-if="startDate && endDate" class="overall-summary">
      <h4>카테고리별 총 지출</h4>
      <div v-for="(amount, category) in categoryTotalAmounts" :key="category" class="summary-item">
        <div class="color-box" :style="{ backgroundColor: getCategoryColor(category) }"></div>
        <div class="label">{{ category }}</div>
        <div class="amount">{{ amount.toLocaleString() }}원</div>
      </div>
    </div>
    <div v-if="startDate && endDate">
      <div v-for="(monthData, month) in sortedFilteredMonthlyData" :key="month" class="monthly-section">
        <h4>{{ month }}</h4>
        <div class="chart">
          <DoughnutChart :data="getChartData(monthData)" :options="chartOptions" />
        </div>
        <div class="list">
          <div v-for="(amount, category) in getCategoryAmounts(monthData)" :key="category" class="list-item">
            <div class="color-box" :style="{ backgroundColor: getCategoryColor(category) }"></div>
            <div class="label">{{ category }}</div>
            <div class="amount">{{ amount.toLocaleString() }}원</div>
          </div>
          <div class="list-item total">
            <div class="label">월 총합</div>
            <div class="amount">{{ getTotalAmount(monthData).toLocaleString() }}원</div>
          </div>
        </div>
        <div v-if="lastMonthData[month]" class="savings">
          <h4>이번달은 저번달보다</h4>
          <div v-for="(amount, category) in compareWithLastMonth(monthData, lastMonthData[month])" :key="category" class="list-item">
            <div class="label">{{ category }}</div>
            <div class="amount">{{ amount > 0 ? `${amount.toLocaleString()}원 절약하셨네요!` : `${Math.abs(amount).toLocaleString()}원 더 지출하셨네요.` }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { mapGetters } from 'vuex';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'StatsView',
  components: {
    DoughnutChart: Doughnut
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      categoryColors: {
        '식비': '#ff6384',
        '교통비': '#36a2eb',
        '주거비': '#cc65fe',
        '기타': '#ffce56',
        '의류': '#ffa500',
        '엔터테인먼트': '#8a2be2',
        '의료': '#ff4500',
        '교육': '#7fffd4'
      }
    };
  },
  computed: {
    ...mapGetters(['receipts']),
    filteredReceipts() {
      if (!this.startDate || !this.endDate) {
        return [];
      }
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      return this.receipts.filter(receipt => {
        if (!receipt || !receipt.date) return false;
        const date = new Date(receipt.date);
        return date >= start && date <= end;
      });
    },
    totalAmount() {
      return this.filteredReceipts.reduce((sum, receipt) => sum + parseInt(receipt.amount, 10), 0);
    },
    monthlyData() {
      const groupedData = {};
      this.filteredReceipts.forEach(receipt => {
        const month = receipt.date.substr(0, 7); // 'YYYY-MM'
        if (!groupedData[month]) {
          groupedData[month] = [];
        }
        groupedData[month].push(receipt);
      });
      return groupedData;
    },
    filteredMonthlyData() {
      const filteredData = {};
      Object.keys(this.monthlyData).forEach(month => {
        const monthData = this.monthlyData[month].filter(receipt => {
          const date = new Date(receipt.date);
          return date >= new Date(this.startDate) && date <= new Date(this.endDate);
        });
        if (monthData.length) {
          filteredData[month] = monthData;
        }
      });
      return filteredData;
    },
    sortedFilteredMonthlyData() {
      return Object.keys(this.filteredMonthlyData)
        .sort()
        .reduce((acc, key) => {
          acc[key] = this.filteredMonthlyData[key];
          return acc;
        }, {});
    },
    lastMonthData() {
      const lastMonthData = {};
      const months = Object.keys(this.sortedFilteredMonthlyData).sort();
      for (let i = 1; i < months.length; i++) {
        const lastMonth = months[i - 1];
        const currentMonth = months[i];
        lastMonthData[currentMonth] = this.sortedFilteredMonthlyData[lastMonth] || [];
      }
      return lastMonthData;
    },
    categoryTotalAmounts() {
      const amounts = {};
      this.filteredReceipts.forEach(receipt => {
        if (!amounts[receipt.category]) {
          amounts[receipt.category] = 0;
        }
        amounts[receipt.category] += parseInt(receipt.amount, 10);
      });
      return amounts;
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      };
    }
  },
  methods: {
    updateDate() {
      localStorage.setItem('startDate', this.startDate);
      localStorage.setItem('endDate', this.endDate);
      console.log(`Selected Date Range: ${this.startDate} - ${this.endDate}`);
    },
    getCategoryAmounts(receipts) {
      const amounts = {};
      receipts.forEach(receipt => {
        if (!amounts[receipt.category]) {
          amounts[receipt.category] = 0;
        }
        amounts[receipt.category] += parseInt(receipt.amount, 10);
      });
      return amounts;
    },
    getChartData(receipts) {
      const categoryAmounts = this.getCategoryAmounts(receipts);
      const labels = Object.keys(categoryAmounts);
      const data = Object.values(categoryAmounts);
      const backgroundColor = labels.map(category => this.getCategoryColor(category));
      const hoverBackgroundColor = labels.map(category => this.getCategoryColor(category));

      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor,
            hoverBackgroundColor
          }
        ]
      };
    },
    getTotalAmount(receipts) {
      return receipts.reduce((sum, receipt) => sum + parseInt(receipt.amount, 10), 0);
    },
    compareWithLastMonth(currentMonthData, lastMonthData) {
      const currentAmounts = this.getCategoryAmounts(currentMonthData);
      const lastAmounts = this.getCategoryAmounts(lastMonthData);
      const comparison = {};
      Object.keys(currentAmounts).forEach(category => {
        comparison[category] = currentAmounts[category] - (lastAmounts[category] || 0);
      });
      return comparison;
    },
    goBack() {
      this.$router.go(-1);
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getCategoryColor(category) {
      if (!this.categoryColors[category]) {
        const storedColors = JSON.parse(localStorage.getItem('categoryColors') || '{}');
        if (storedColors[category]) {
          this.categoryColors[category] = storedColors[category];
        } else {
          this.categoryColors[category] = this.getRandomColor();
          storedColors[category] = this.categoryColors[category];
          localStorage.setItem('categoryColors', JSON.stringify(storedColors));
        }
      }
      return this.categoryColors[category];
    }
  },
  created() {
    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');
    if (storedStartDate && storedEndDate) {
      this.startDate = storedStartDate;
      this.endDate = storedEndDate;
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 80px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.back-button {
  position: absolute;
  left: 20px;
  top: 0;
  background: none;
  border: none;
  font-size: 24px;
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

.overall-summary {
  margin-bottom: 40px;
}

.summary-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.summary-item .color-box {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.summary-item .label {
  flex: 1;
  color: #4f4f4f;
}

.summary-item .amount {
  color: #4f4f4f;
}

.monthly-section {
  margin-bottom: 40px;
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
  margin-right: 10px;
}

.list-item .label {
  flex: 1;
  color: #4f4f4f;
}

.list-item .amount {
  color: #4f4f4f;
}

.list-item.total {
  font-weight: bold;
}

.savings {
  background-color: #e0ffe0;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}

.savings h4 {
  margin: 0 0 10px 0;
}

.savings .list-item {
  padding: 5px 0;
}

.footer {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
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