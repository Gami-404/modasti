import API from "../api";

const state = {
  set: {},
  sets: []
};

// getters
const getters = {
  set: (state) => state.set,
  sets: (state) => state.sets
};

// actions
const actions = {
  getSet({ commit }, state) {
    return API.get("").then(res => {
      commit("SET", res.data);
    });
  },
  getSets({ commit }, state) {
    return API.get("").then(res => {
      commit("SETS", res.data);
    });
  }
};

// mutations
const mutations = {
  SET(state, data) {
    state.set = data;
  },
  SETS(state, data) {
    state.sets = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
