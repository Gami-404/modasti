import API from "../API";

const state = {};

// getters
const getters = {};

// actions
const actions = {
  get_collection_details({ commit, state }, setId) {
    if (setId == state.set.id) return Promise.resolve();
    return API.post("/setDetails", {
      setId
    }).then(res => {
      commit("ADD_ITEMS", res.data.data.set.items, { root: true });
      res.data.data.set.items = res.data.data.set.items.map(item => item.id);
      commit("SET", res.data.data.set);
    });
  },
  add_collection({ commit }, payload) {
    return API.post("/addCollection", payload);
  },
  remove_collection({ commit }, collectionId) {
    return API.post("/deleteCollection", { collectionId }).then(res => {
      commit("REMOVE_COLLECTION", res.data.data.set);
    });
  },
  like_collection_toggle({ commit }) {
    commit("LIKE_COLLECTION_TOGGLE");
  },
  get_collection_comments({ commit }, setId) {
    return API.post("/getSetComments", {
      setId
    }).then(res => {
      commit("COLLECTION_COMMENTS", res.data.data.comments);
    });
  },
  add_comment_to_collection({ commit, dispatch }, payload) {
    return API.post("/addCommentToSet", {
      setId: payload.setId,
      text: payload.comment,
      parentId: "0"
    }).then(dispatch("get_set_comments", payload.setId));
  },
  delete_comment_on_collection({ commit, dispatch }, setId) {
    return API.post("/deleteComment", { setId }).then(
      dispatch("get_set_comments", setId)
    );
  }
};

// mutations
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
