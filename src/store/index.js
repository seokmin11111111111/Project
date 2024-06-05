import Vue from 'vue';
import { createStore } from 'vuex';

export default createStore({
  state: {
    receipts: []
  },
  mutations: {
    addReceipt(state, receipt) {
      state.receipts.push(receipt);
      console.log('Receipt added:', receipt);
    },
    updateReceipt(state, { index, receipt }) {
      state.receipts.splice(index, 1, receipt);
      console.log('Receipt updated:', receipt);
    },
    deleteReceipt(state, index) {
      state.receipts.splice(index, 1);
      console.log('Receipt deleted at index:', index);
    }
  },
  actions: {
    addReceipt({ commit }, receipt) {
      commit('addReceipt', receipt);
    },
    updateReceipt({ commit }, payload) {
      commit('updateReceipt', payload);
    },
    deleteReceipt({ commit }, index) {
      commit('deleteReceipt', index);
    }
  },
  getters: {
    receipts: (state) => state.receipts,
    getReceiptById: (state) => (id) => state.receipts[id]
    
  }
});