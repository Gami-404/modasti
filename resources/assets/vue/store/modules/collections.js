import API from "../api";

const state = {
  collection: {},
  collections: []
};

// getters
const getters = {
  collection: (state) => state.collection,
  collections: (state) => state.collections
};

// actions
const actions = {
  getCollection({ commit }, state) {
    return API.get("").then(res => {
      commit("COLLECTION", res.data);
    });
  },
  getCollections({ commit }, state) {
    return API.get("").then(res => {
      commit("COLLECTIONS", res.data);
    });
  }
};

// mutations
const mutations = {
  COLLECTION(state, data) {
    state.collection = data;
  },
  COLLECTIONS(state, data) {
    state.collections = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
