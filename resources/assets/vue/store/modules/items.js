import API from "../api";
import mock from "./mocks/items.mock";

const state = {
  item: {},
  items: []
};

// getters
const getters = {
  item: (state) => state.item,
  items:(state) => state.items
};

// actions
const actions = {
  item({ commit }, type) {
    setTimeout(() => {
      commit("ITEM", mock(8)[0]);
    }, 300);
  },
  items({ commit }, type) {
    setTimeout(() => {
      commit("ITEMS", mock(8));
    }, 300);
  }
};

// mutations
const mutations = {
  ITEM(state, data) {
    state.item = data;
  },
  ITEMS(state, data) {
    state.items = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
