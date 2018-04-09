import API from "../API";
const state = {
  searchResults: [],
  userProfile: {},
  userSets: [],
  userFollowers: [],
  userFollowing: [],
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
    sets: 0,
    collections: 0,
    search: 0
  }
};

// getters
const getters = {
  userSearchResults: state => state.searchResults,
  userProfile: state => state.userProfile,
  userSets: state => state.userSets,
  userCollections: state => state.userCollections,
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
  get_user_profile({ commit }, id) {
    return API.post("/getProfile", {
      userId: id
    }).then(res => {
      // commit("RESET_USER_PROFILE");
      commit("USER_PROFILE", res.data[0]);
    });
  },
  get_user_liked_items({ commit, state }, id) {
    return API.post("/getLikedItems", {
      userId: id,
      offset: state.offsets.likedItems,
      limit: 8
    }).then(res => {
      commit("USER_LIKED_ITEMS", res.data.data);
    });
  },
  get_user_liked_sets({ commit, state }, id) {
    return API.post("/getLikedSets", {
      userId: id,
      offset: state.offsets.likedSets,
      limit: 8
    }).then(res => {
      commit("USER_LIKED_SETS", res.data.data);
    });
  },
  get_user_liked_collections({ commit, state }, id) {
    return API.post("/getLikedItems", {
      userId: 0,
      offset: state.offsets.likedCollections,
      limit: 8
    }).then(res => {
      commit("USER_LIKED_COLLECTIONS", res.data.data);
    });
  },
  search_user({ commit, state }, searchString) {
    return search(searchString, state.searchResults.offset).then(res => {
      commit("SEARCH_RESULTS_OFFSET");
      commit("SEARCH_RESULTS", res.data.data);
    });
  },
  search_user_more({ commit, state }, searchString) {
    return search(searchString, state.searchResults.offset).then(res => {
      commit("SEARCH_RESULTS_OFFSET");
      commit("SEARCH_RESULTS_MORE", res.data.data);
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
  RESET_USER_PROFILE() {
    state.userItems = 0;
    state.offsets.items = 0;
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
