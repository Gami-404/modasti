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
      commit("ADD_ITEMS",res.data.data.set.items ,{root:true});
      res.data.data.set.items = res.data.data.set.items.map(item => item.id);
      commit("SET", res.data.data.set );
    });
  },
  remove_set({ commit }, setId) {
    return API.post("/deleteSet", {
      setId
    }).then(res => {
      commit("REMOVE_SET", res.data.data.set);
    });
  },
  like_set_toggle({commit}){
    commit("LIKE_SET_TOGGLE");
  }
};

// mutations
const mutations = {
  SET(state, data) {
    state.set = data;
  },
  REMOVE_SET(state) {
    state.set = {};
  },
  LIKE_SET_TOGGLE(state){
    if(state.set.title_en){
      state.set.is_liked = !state.set.is_liked;
      state.set.is_liked ? state.set.likes ++ : state.set.likes --;  
      state.set = {...state.set };
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
