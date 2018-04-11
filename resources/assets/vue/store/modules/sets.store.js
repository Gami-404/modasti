import API from "../API";

const state = {
  set: {},
};

// getters
const getters = {
  set: state => state.set,
};

// actions
const actions = {
  get_set_details({ commit, state }, setId) {
    if (setId == state.set.id) return Promise.resolve();
    return API.post("/setDetails", {
      setId
    }).then(res => {
      commit("SET", res.data.data.set);
    });
  },
  remove_set({ commit }, setId) {
    return API.post("/deleteSet", {
      setId
    }).then(res => {
      commit("REMOVE_SET", res.data.data.set);
    });
  },
};

// mutations
const mutations = {
  SET(state, data) {
    state.set = data;
  },
  REMOVE_SET(state) {
    state.set = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
