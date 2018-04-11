import API from "../API";

const emptyState = {
  searchResults: [],
  userProfile: {},
  userSets: [],
  followers: [],
  following: [],
  liked: {
    items: [],
    sets: [],
    collections: []
  },
  userCollections: [],
  offsets: {
    likedItems: 0,
    likedSets: 0,
    likedCollections: 0,
    following: 0,
    followers: 0,
    sets: 0,
    collections: 0,
    search: 0
  }
};
const state = JSON.parse(JSON.stringify(emptyState));
const getFreshState = () =>
  Promise.resolve({ emptyState })
    .then(JSON.stringify)
    .then(JSON.parse);

// getters
const getters = {
  userSearchResults: state => state.searchResults,
  userProfile: state => state.userProfile,
  userSets: state => state.userSets,
  userCollections: state => state.userCollections,
  followers: state => state.followers,
  following: state => state.following,
  likedItems: state => state.liked.items,
  likedSets: state => state.liked.sets,
  likedCollections: state => state.liked.collections
};

// helper function !
const search = (searchString, offset) =>
  API.post("/search", {
    searchString: searchString,
    searchArea: "users",
    offset: offset,
    limit: 6
  });

// actions
const actions = {
  async get_user_profile({ commit, state }, id) {
    state = await getFreshState();
    return API.post("/getProfile", {
      userId: id
    }).then(res => {
      commit("USER_PROFILE", res.data[0]);
    });
  },
  get_user_sets({ commit }, id) {
    return API.post("/getSets", {
      userId: id,
      offset: state.offsets.sets,
      limit: 8
    }).then(res => {
      commit("USER_SETS", res.data.data);
    });
  },
  get_user_liked_items({ commit, state }, id) {
    return API.post("/getLikedItems", {
      userId: id,
      offset: state.offsets.likedItems,
      limit: 8
    }).then(res => {
      commit("ADD_ITEMS", res.data.data, { root: true });
      commit("USER_LIKED_ITEMS", res.data.data.map(item => item.id));
    });
  },
  get_user_liked_sets({ commit, state }, id) {
    return API.post("/getLikedSets", {
      userId: id,
      offset: state.offsets.likedSets,
      limit: 8
    }).then(res => {
      commit("ADD_SETS", res.data.data, { root: true });
      commit("USER_LIKED_SETS", res.data.data.map(set => set.id));
    });
  },
  get_user_liked_collections({ commit, state }, id) {
    return API.post("/getLikedItems", {
      userId: 0,
      offset: state.offsets.likedCollections,
      limit: 8
    }).then(res => {
      // TODO
      commit("USER_LIKED_COLLECTIONS", res.data.data);
    });
  },
  get_user_followers({ commit, state }, id) {
    return API.post("/getFollowersUsers", {
      userId: id
    }).then(res => {
      commit("ADD_USERS" , res.data.data.users , {root:true});
      commit("USER_FOLLOWERS", res.data.data.users.map(user => user.id));
    });
  },
  get_user_following({ commit, state }, id) {
    return API.post("/getFollowingUsers", {
      userId: id
    }).then(res => {
      commit("ADD_USERS" , res.data.data.users , {root:true});      
      commit("USER_FOLLOWING", res.data.data.users.map(user => user.id));
    });
  },
  update_user({ commit }, formData) {
    return API.post("/profileUpdate", formData).then(() => {
      commit("UPDATE_USER_PROFILE", formData);
    });
  },
  search_user({ commit, state }, searchString) {
    return search(searchString, state.searchResults.offset).then(res => {
      commit("SEARCH_RESULTS_OFFSET");
      commit("ADD_USERS", res.data.data);
      commit("SEARCH_RESULTS", res.data.data.map(user => user.id));
    });
  },
  search_user_more({ commit, state }, searchString) {
    return search(searchString, state.searchResults.offset).then(res => {
      commit("SEARCH_RESULTS_OFFSET");
      commit("ADD_USERS", res.data.data);
      commit("SEARCH_RESULTS_MORE", res.data.data.map(user => user.id));
    });
  },
  search_user_offset_reset({ commit }) {
    commit("SEARCH_RESULTS_OFFSET_RESET");
  }
};

// mutations
const mutations = {
  USER_PROFILE(state, data) {
    state.userProfile = data;
  },
  USER_SETS(state, data) {
    state.userSets = data;
    state.offsets.sets += 8;
  },
  USER_LIKED_ITEMS(state, data) {
    state.liked.items = state.liked.items.concat(data);
    state.offsets.likedItems += 8;
  },
  USER_LIKED_SETS(state, data) {
    state.liked.sets = state.liked.sets.concat(data);
    state.offsets.likedSets += 8;
  },
  USER_LIKED_COLLECTIONS(state, data) {
    state.liked.collections = state.liked.collections.concat(data);
    state.offsets.likedCollections += 8;
  },
  USER_FOLLOWERS(state, data) {
    state.followers = state.followers.concat(data);
    state.offsets.followers += 8;
  },
  USER_FOLLOWING(state, data) {
    state.following = state.following.concat(data);
    state.offsets.following += 8;
  },
  UPDATE_USER_PROFILE(state, data) {
    state.userProfile.fname = data.firstName;
    state.userProfile.email = data.email;
  },
  SEARCH_RESULTS_OFFSET({ offsets }) {
    offsets.search += 5;
  },
  SEARCH_RESULTS_OFFSET_RESET({ offsets }) {
    offsets.search = 0;
  },
  SEARCH_RESULTS({ searchResults }, data) {
    searchResults = data;
  },
  SEARCH_RESULTS_MORE({ searchResults }, data) {
    searchResults.concat(data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
