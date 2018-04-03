const state = {
  searchResults:{
    users:[],
    offset: 0
  }
};

// getters
const getters = {
  userSearchResults: state => state.searchResults.users   
};

// actions
const actions = {
  search_user({ commit, state }, serachString) {
    return API.post("/search", {
      searchString: serachString,
      searchArea: "user",
      offset: 0,
      limit: 6
    }).then( res => {
      commit("SEARCH_RESULTS_OFFSET");
      commit("SEARCH_RESULTS", res.data.data );
    });
  },
  search_user_more({ commit, state }, serachString) {
    return API.post("/search", {
      searchString: serachString,
      searchArea: "user",
      offset: state.searchResults.offset,
      limit: 6
    }).then( res => {
      commit("SEARCH_RESULTS_OFFSET");
      commit("SEARCH_RESULTS_MORE", res.data.data );
    });
  },
  search_user_offset_reset( {commit} ){
    commit("SEARCH_RESULTS_OFFSET_RESET");
  }
};

// mutations
const mutations = {
  SEARCH_RESULTS_OFFSET({searchResults}){
    searchResults.offset += 5;    
  },
  SEARCH_RESULTS_OFFSET_RESET({searchResults}){
    searchResults.offset = 0;    
  },
  SEARCH_RESULTS({searchResults} , data ){
    searchResults.users = data;
  },
  SEARCH_RESULTS_MORE({searchResults} , data ){
    searchResults.users.concat(data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};