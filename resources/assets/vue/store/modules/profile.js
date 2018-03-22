import API from "../api";

const state = {
  userProfile: {}
};

// getters
const getters = {
  userProfile(state) {
    return state.userProfile;
  }
};

// actions
const actions = {
  userProfile({ commit }, id) {
    return API.get("").then(res => {
      commit("USER_PROFILE", res.data);
    });
  }
};

// mutations
const mutations = {
  USER_PROFILE(state, data) {
    state.userProfile = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
