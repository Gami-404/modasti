import API from "../api";

const state = {
  set: {},
  sets: []
};

// getters
const getters = {
  set(state) {
    return state.set;
  },
  sets(state) {
    return state.sets;
  }
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
