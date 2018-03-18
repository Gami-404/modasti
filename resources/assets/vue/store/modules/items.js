import mock from './mocks/items.mock';

const state = {
  item: {},
  items:[],
};

// getters
const getters = {
  items(state) {
    return state.items;
  }
};

// actions
const actions = {
  items({ commit }, type ) {
    console.log('getting items with type '+ type);
    setTimeout( ()=>{
      commit('items', mock(8));
    } , 300 );
  }
};

// mutations
const mutations = {
  items(state, items) {
    state.items = items;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};