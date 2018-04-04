import API from "../API";
const state = {
  searchResults: {
    users: [],
    offset: 0
  }
};

// getters
const getters = {
  userSearchResults: state => state.searchResults.users
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
  SEARCH_RESULTS_OFFSET({ searchResults }) {
    searchResults.offset += 5;
  },
  SEARCH_RESULTS_OFFSET_RESET({ searchResults }) {
    searchResults.offset = 0;
  },
  SEARCH_RESULTS({ searchResults }, data) {
    searchResults.users = data;
  },
  SEARCH_RESULTS_MORE({ searchResults }, data) {
    searchResults.users.concat(data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
