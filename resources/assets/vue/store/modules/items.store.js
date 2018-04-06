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
  },
  filters: {
    byBrand: { _counter: 0 },
    byColor: { _counter: 0, "#000": false, "#fff": false },
    byPrice: { _counter: 0 },
    bySize: { _counter: 0 },
    sub: -1
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
  categoryItems: state => state.category.items,
  itemSearchResults: state => state.searchResults.items,
  filters: state => state.filters,
  filterOptions: state => {
    let options = {};
    Object.keys(state.filters).forEach(key => {
      let keys = Object.keys(state.filters[key]);
      keys.splice(keys.indexOf("_counter"), 1);
      keys.length > 0 ? (options[key] = keys) : null;
    });
    return options;
  },
  categoryFiltered: state =>
    state.category.items
      ? state.category.items
          .filter(item => {
            return (
              state.filters.sub == -1 || item.categories_id == state.filters.sub
            );
          })
          .filter(
            item =>
              state.filters.byBrand._counter == 0 ||
              state.filters.byBrand[item.brand]
          )
          .filter(
            item =>
              state.filters.byColor._counter == 0 ||
              state.filters.byColor[item.color]
          )
      : []
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
    return API.post("/switchLike", {
      objId,
      targetObject: "item"
    }).then(() => {
      commit("LIKE_ITEM_PROPAGATE", objId);
      commit("LIKE_ITEM_PROPAGATE_IN_SETS", objId, { root: true });
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
  CATEGORY_ITEMS(state, data) {
    state.categories[data.id]["items"] = data.items.slice(1, 10);
  },
  CATEGORY(state, id) {
    state.category = state.categories[id];
  },
  LIKE_ITEM_PROPAGATE(state, id) {
    let toggleLikes = item => {
      item.id == id ? (item.is_liked = !item.is_liked) : 0;
      return { ...item };
    };
    state.home.itemsMostPopular.forEach(toggleLikes);
    state.home.itemsLatestTrends.forEach(toggleLikes);
    state.searchResults.items.forEach(toggleLikes);
    Object.keys(state.categories).forEach( key =>{
      state.categories[key].items.forEach(toggleLikes);
    });
    // for (let key in state.categories) {
    //   if (state.categories[key].items) {
    //      let x = state.categories[key].items.map(
    //       toggleLikes
    //     );
    //     state.categories[key].items.splice();
    //     state.categories[key].items=x;
    //   }
    // }
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
  },
  ADD_FILTER(state, payload) {
    if (state.filters[payload.filter][payload.val]) return;
    state.filters[payload.filter][payload.val] = true;
    state.filters[payload.filter]._counter++;
  },
  REMOVE_FILTER(state, payload) {
    if (!state.filters[payload.filter][payload.val]) return;
    state.filters[payload.filter][payload.val] = false;
    state.filters[payload.filter]._counter--;
  },
  CHANGE_FILTER_SUB(state, id) {
    state.filters.sub = id;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
