import { createStore } from 'vuex';

export default createStore({
  state: {
    receipts: JSON.parse(localStorage.getItem('receipts')) || []
  },
  mutations: {
    ADD_RECEIPT(state, receipt) {
      state.receipts.push(receipt);
      localStorage.setItem('receipts', JSON.stringify(state.receipts));
    },
    UPDATE_RECEIPT(state, { index, receipt }) {
      state.receipts.splice(index, 1, receipt);
      localStorage.setItem('receipts', JSON.stringify(state.receipts));
    },
    DELETE_RECEIPT(state, index) {
      state.receipts.splice(index, 1);
      localStorage.setItem('receipts', JSON.stringify(state.receipts));
    }
  },
  actions: {
    addReceipt({ commit }, receipt) {
      commit('ADD_RECEIPT', receipt);
    },
    updateReceipt({ commit }, payload) {
      commit('UPDATE_RECEIPT', payload);
    },
    deleteReceipt({ commit }, index) {
      commit('DELETE_RECEIPT', index);
    }
  },
  getters: {
    receipts: state => state.receipts,
    getReceiptById: state => id => state.receipts[id],
    getReceiptsByMonth: state => {
      return state.receipts.reduce((acc, receipt) => {
        const month = receipt.date.substr(0, 7); // 'YYYY-MM'
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(receipt);
        return acc;
      }, {});
    }
  }
});