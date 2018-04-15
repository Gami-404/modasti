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
  like_set({ commit , dispatch }, objId) {
    return API.post("/switchLike", {
      objId,
      targetObject: "set"
    }).then( () => {
      commit("LIKE_SET_PROPAGATE", objId);
    });
  },
  follow_user({ commit }, id) {
    return API.post("/followUser", {
      userId: id
    }).then( () =>{
      commit("FOLLOW_USER_PROPAGATE" ,id );
    });
  },
  unfollow_user({ commit }, id) {
    return API.post("/unfollowUser", {
      userId: id
    }).then( () =>{
      commit("FOLLOW_USER_PROPAGATE" ,id );
    });
  },
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
    state.items[id].is_liked = !state.items[id].is_liked;
    state.items[id].is_liked ? state.items[id].likes ++ : state.items[id].likes --;
    state.items = { ...state.items };
  },
  LIKE_SET_PROPAGATE(state, id) {
    if(state.sets[id]){
      state.sets[id].is_liked = !state.sets[id].is_liked;
      state.sets[id].is_liked ? state.sets[id].likes ++ : state.sets[id].likes --;    
      state.sets = { ...state.sets };
    }
  },
  FOLLOW_USER_PROPAGATE(state , id){
    state.users[id].is_followed = !state.users[id].is_followed;
    state.users = { ...state.users };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
