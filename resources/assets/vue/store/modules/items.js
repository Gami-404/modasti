const state = {
  item: {},
  error: [],
  loading: false
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
    axios.post('itemDetails', { "itemId": 0 }).then(res => {
      commit('item', res.data);
      commit('loading');
    }).catch(err => {
      commit('error');
      commit('loading');      
    });
  }
};

// mutations
const mutations = {

  item(state, item) {
    state.item = item;
  },
  loading(state){
    state.loading = ! state.loading;
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};