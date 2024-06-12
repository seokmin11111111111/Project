import { createStore } from 'vuex';

export default createStore({
  state: {
    receipts: JSON.parse(localStorage.getItem('receipts')) || [],
    isAuthenticated: false,
    userId: null,
    selectedReceipt: {} // Selected receipt state
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
    },
    SET_AUTH(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
      state.userId = payload.userId;
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.userId = null;
    },
    SELECT_RECEIPT(state, receipt) {
      state.selectedReceipt = receipt;
    },
    CLEAR_SELECTED_RECEIPT(state) {
      state.selectedReceipt = {};
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
    },
    login({ commit }, userId) {
      commit('SET_AUTH', { isAuthenticated: true, userId });
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    selectReceipt({ commit }, receipt) {
      commit('SELECT_RECEIPT', receipt);
    },
    clearSelectedReceipt({ commit }) {
      commit('CLEAR_SELECTED_RECEIPT');
    }
  },
  getters: {
    receipts: state => state.receipts,
    getReceiptById: state => id => state.receipts.find(receipt => receipt.id === id),
    getReceiptsByMonth: state => {
      return state.receipts.reduce((acc, receipt) => {
        const month = receipt.date.substr(0, 7); // 'YYYY-MM'
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(receipt);
        return acc;
      }, {});
    },
    getTotalAmountByMonth: (state, getters) => (year, month) => {
      const monthString = `${year}-${month < 10 ? '0' + month : month}`;
      const receipts = getters.getReceiptsByMonth[monthString] || [];
      return receipts.reduce((total, receipt) => total + Number(receipt.amount || 0), 0);
    },
    isAuthenticated: state => state.isAuthenticated,
    userId: state => state.userId,
    selectedReceipt: state => state.selectedReceipt
  }
});
