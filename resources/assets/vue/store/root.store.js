import API from "./API";

const state = {
  users: {},
  items: {},
  sets: {},
  collections: {}
};

const actions = {
  like_item({ commit }, objId) {
    return API.post("/switchLike", {
      objId,
      targetObject: "item"
    }).then( () => {
      commit("LIKE_ITEM_PROPAGATE", objId);
    });
  },
  like_set({ commit }, objId) {
    return API.post("/switchLike", {
      objId,
      targetObject: "set"
    }).then( () => {
      commit("LIKE_SET_PROPAGATE", objId);
    });
  }
};

// getters
const getters = {
  getUser: state => id => state.users[id],
  getItem: state => id => state.items[id],
  getItems: state => ids => ids.map(id => state.items[id]),
  getSet: state => id => state.sets[id],
  getCollection: state => id => state.collections[id]
};

// mutations
const mutations = {
  ADD_USER(state, user) {
    state.users[user.id] = user;
  },
  ADD_USERS(state, users) {
    users.forEach(user => {
      state.users[user.id] = user;
    });
  },
  ADD_ITEM(state, item) {
    state.items[item.id] = item;
  },
  ADD_ITEMS(state, items) {
    items.forEach(item => {
      state.items[item.id] = item;
    });
  },
  ADD_SET(state, set) {
    state.sets[set.id] = set;
  },
  ADD_SETS(state, sets) {
    sets.forEach(set => {
      state.sets[set.id] = set;
    });
  },
  ADD_COLLECTION(state, collection) {
    state.collections[collection.id] = collection;
  },
  ADD_COLLECTIONS(state, collections) {
    collections.forEach(collection => {
      state.collections[collection.id] = collection;
    });
  },
  LIKE_ITEM_PROPAGATE(state, id) {
    Object.keys(state.items).forEach(key => {
      if (state.items[key].id == id) {
        state.items[key].is_liked = !state.items[key].is_liked;
        console.log(state.items[key]);
      }
    });
    state.items = { ...state.items };
  },
  LIKE_SET_PROPAGATE(state, id) {
    Object.keys(state.sets).forEach(key => {
      if (state.sets[key].id == id) {
        state.sets[key].is_liked = !state.sets[key].is_liked;
        console.log(state.sets[key]);
      }
    });
    state.sets = { ...state.sets };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
