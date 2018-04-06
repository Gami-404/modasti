import API from "../API";

const state = {
  set: {},
  sets: []
};

// getters
const getters = {
  set: state => state.set,
  sets: state => state.sets
};

// actions
const actions = {
  get_set_details({ commit, state }, setId) {
    if (setId == state.set.id) return Promise.resolve();
    return API.post("/setDetails", {
      setId
    }).then(res => {
      commit("SET", res.data.data.set);
    });
  },
  remove_set({ commit }, setId) {
    return API.post("/deleteSet", {
      setId
    }).then(res => {
      commit("REMOVE_SET", res.data.data.set);
    });
  },
  like_set({ commit }, objId) {
    commit("LIKE_SET_PROPAGATE", objId);
    return API.post("/switchLike", {
      objId,
      targetObject: "set"
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
  LIKE_SET_PROPAGATE(state, setId) {
    state.set.id == setId ? (state.set.is_liked = !state.set.is_liked) : 0;
  },
  LIKE_ITEM_PROPAGATE_IN_SETS(state, itemId) {
    state.set["items"]
      ? state.set["items"].forEach(item => {
          item.id == itemId ? (item.is_liked = !item.is_liked) : null;
        })
      : null;

    state.sets
      ? state.sets.forEach(set => {
          set["items"]
            ? set["items"].forEach(item => {
                item.id == itemId ? (item.is_liked = !item.is_liked) : null;
              })
            : null;
        })
      : null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
