import API from "../API";

const state = {
  item: {},
  home: {
    itemsMostPopular: [],
    setsBestFromCommunity: [],
    itemsLatestTrends: [],
    setsBestFromModasti: []
  },
  categories: [],
  category: {},
  catIdMap: {},
  searchResults: {
    items: [],
    offset: 0
  }
};

// getters
const getters = {
  item: state => state.item,
  itemsMostPopular: state => state.home.itemsMostPopular,
  itemsLatestTrends: state => state.home.itemsLatestTrends,
  setsBestFromCommunity: state => state.home.setsBestFromCommunity,
  setsBestFromModasti: state => state.home.setsBestFromModasti,
  category: state => state.category,
  itemSearchResults: state => state.searchResults.items
};

// helper function !
const search = (searchString, offset) =>
  API.post("/search", {
    searchString: searchString,
    searchArea: "items",
    offset: offset,
    limit: 6
  });

// actions
const actions = {
  get_item({ commit }, id) {
    return API.post("/itemDetails", {
      itemId: id
    }).then(res => {
      commit("ITEM", res.data.data);
    });
  },
  get_home_items({ commit }) {
    return API.post("/homeTrends", {}).then(res => {
      commit("HOME_ITEMS", res.data.data);
    });
  },
  get_categories({ commit }) {
    return API.post("/getItemsCategories", {}).then(res => {
      commit("CATEGORIES", res.data.data);
    });
  },
  get_category_items({ commit, state }, name) {
    let catId = state.catIdMap[name];
    if (state.categories[catId]["items"]) {
      commit("CATEGORY", catId);
      return Promise.resolve();
    } else {
      return API.post("/getItemsFromCategory", {
        categoryId: catId
      }).then(res => {
        commit("CATEGORY_ITEMS", { items: res.data.data, id: catId });
        commit("CATEGORY", catId);
      });
    }
  },
  like_item({ commit }, objId) {
    console.log(objId);
    return API.post("/switchLike", {
      objId,
      targetObject: "item"
    }).then(() => {
      commit("LIKE_PROPAGATE", objId);
    });
  },
  search_item({ commit, state }, searchString) {
    return search(searchString, state.searchResults.offset).then(res => {
      commit("SEARCH_RESULTS_OFFSET");
      commit("SEARCH_RESULTS", res.data.data);
    });
  },
  search_item_more({ commit, state }, searchString) {
    return search(searchString, state.searchResults.offset).then(res => {
      commit("SEARCH_RESULTS_OFFSET");
      commit("SEARCH_RESULTS_MORE", res.data.data);
    });
  },
  search_item_offset_reset({ commit }) {
    commit("SEARCH_RESULTS_OFFSET_RESET");
  }
};

// mutations
const mutations = {
  ITEM(state, data) {
    state.item = data;
  },
  HOME_ITEMS({ home }, data) {
    home.itemsMostPopular = data.items_most_popular;
    home.itemsLatestTrends = data.items_latest_trends;
    home.setsBestFromModasti = data.sets_best_from_modasti;
    home.setsBestFromCommunity = data.sets_best_from_community;
  },
  CATEGORIES(state, data) {
    let temp = {};
    for (let key in data) {
      temp[data[key].id] = data[key];
      state.catIdMap[key.toLocaleLowerCase()] = data[key].id;
      delete data[key];
    }
    state.categories = temp;
  },
  CATEGORY_ITEMS({ categories }, data) {
    categories[data.id]["items"] = data.items;
  },
  CATEGORY(state, id) {
    state.category = state.categories[id];
  },
  LIKE_PROPAGATE(state, id) {
    let toggleLikes = item => {
      item.id == id ? (item.is_liked = !item.is_liked) : 0;
    };
    state.home.itemsMostPopular.forEach(toggleLikes);
    state.home.itemsLatestTrends.forEach(toggleLikes);
    state.searchResults.items.forEach(toggleLikes);

    if (state.category.items) state.category.items.forEach(toggleLikes);

    for( key in state.categories){
      if (state.categories[key].items) state.categories[key].items.forEach(toggleLikes);
    }
    
  },
  SEARCH_RESULTS_OFFSET({ searchResults }) {
    searchResults.offset += 5;
  },
  SEARCH_RESULTS_OFFSET_RESET({ searchResults }) {
    searchResults.offset = 0;
  },
  SEARCH_RESULTS({ searchResults }, data) {
    searchResults.items = data;
  },
  SEARCH_RESULTS_MORE({ searchResults }, data) {
    searchResults.items.concat(data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
