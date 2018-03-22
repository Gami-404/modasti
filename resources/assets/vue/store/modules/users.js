import API from "../api";

const state = {
  userProfile: {}
};

// getters
const getters = {
  userProfileById(state) {
    return id => state.users[id];
  }
};

// actions
const actions = {
  userProfileById({ commit }, id) {
    return API.get("").then(res => {
      commit('USER_PROFILE' , res.data );
    });
  }
};

// mutations
const mutations = {
  USER_PROFILE(state, data){
      state.userProfile = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
