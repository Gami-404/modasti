const state = {
  item: {},
  error: [],
};

// getters
const getters = {
  item(state) {
    return state.item;
  }
};

// actions
const actions = {
  item({ commit }, id) {
    commit('loading');
    return axios.post('itemDetails', { "itemId": 0 }).then(res => {
      commit('item', res.data);
    });
  }
};

// mutations
const mutations = {

  item(state, item) {
    state.item = item;
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};