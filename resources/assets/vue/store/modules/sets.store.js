import API from "../API";

const state = {
  set: {},
  setComments: [],
  itemsToAdd: [],
  offset: 0
};

// getters
const getters = {
  set: state => state.set,
  setComments: state => state.setComments,
  setTotalPrice: (state, _, __, rootGetters) =>
    state.set.items
      ? state.set.items
          .reduce(
            (sum, itemId) =>
              sum + parseFloat(rootGetters.getItem(itemId).price),
            0
          )
          .toFixed(2)
      : "000",
  itemsToAdd: state => id => state.itemsToAdd[id]
};

// actions
const actions = {
  get_set_details({ commit, state }, setId) {
    if (setId == state.set.id) return Promise.resolve();
    return API.post("/setDetails", {
      setId
    }).then(res => {
      commit("ADD_ITEMS", res.data.data.set.items, { root: true });
      res.data.data.set.items = res.data.data.set.items.map(item => item.id);
      commit("SET", res.data.data.set);
    });
  },
  add_set({ commit }, payload) {
    return API.post("/addSet", payload);
  },
  edit_set({ commit }, payload) {
    return API.post("/editSet", payload);
  },
  remove_set({ commit }, setId) {
    return API.post("/deleteSet", {
      setId
    }).then(res => {
      commit("REMOVE_SET", res.data.data.set);
    });
  },
  like_set_toggle({ commit }) {
    commit("LIKE_SET_TOGGLE");
  },
  get_set_comments({ commit }, setId) {
    return API.post("/getSetComments", {
      setId,
      limit: 30
    }).then(res => {
      commit("SET_COMMENTS", res.data.data.comments);
    });
  },
  add_comment_to_set({ commit, dispatch }, payload) {
    return API.post("/addCommentToSet", {
      setId: payload.setId,
      text: payload.comment,
      parentId: "0"
    }).then(() => dispatch("get_set_comments", payload.setId));
  },
  delete_comment_on_set({ commit, dispatch }, setId) {
    return API.post("/deleteComment", { setId }).then(() =>
      dispatch("get_set_comments", setId)
    );
  },
  get_items_for_add_set({ commit, state, rootGetters }) {
    return Promise.all([
      API.post("/getLikedItems", {
        userId: rootGetters.userId,
        offset: state.offset,
        limit: 6
      }),
      API.post("/getItemsFromCategory", {
        offset: state.offset,
        categoryId: 1
      }),
      API.post("/getItemsFromCategory", {
        offset: state.offset,
        categoryId: 4
      }),
      API.post("/getItemsFromCategory", {
        offset: state.offset,
        categoryId: 6
      }),
      API.post("/getItemsFromCategory", {
        offset: state.offset,
        categoryId: 24
      })
    ]).then(resArray => {
      resArray.forEach(res => {
        commit("ADD_ITEMS", res.data.data, { root: true });
      });
      commit(
        "ITEMS_FOR_ADD_SEST_AND_COLLECTION",
        resArray.map(res => res.data.data)
      );
    });
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
  LIKE_SET_TOGGLE(state) {
    if (state.set.title_en) {
      state.set.is_liked = !state.set.is_liked;
      state.set.is_liked ? state.set.likes++ : state.set.likes--;
      state.set = { ...state.set };
    }
  },
  SET_COMMENTS(state, data) {
    state.setComments = data;
  },
  ITEMS_FOR_ADD_SEST_AND_COLLECTION(state, arrayOfData) {
    state.offset += 6;
    state.itemsToAdd = arrayOfData;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
