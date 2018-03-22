import API from "../api";
import mock from "./mocks/contests.mock";

const state = {
  contest: {},
  contests: []
};

// getters
const getters = {
  contest(state) {
    return state.contest;
  },
  contests(state) {
    return state.contests;
  }
};

// actions
const actions = {
  contest({ commit }, id) {
    commit("CONTEST", {});
  },
  contests({ commit }) {
    commit("CONTESTS", []);
  }
};

// mutations
const mutations = {
  CONTEST(state, data) {
    state.item = data;
  },
  CONTESTS(state, data) {
    state.items = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
