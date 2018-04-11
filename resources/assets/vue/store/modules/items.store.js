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
  category: { items: [] },
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
  categoryFiltered: (state, _, __, rootGetters) =>
    state.category.items
      ? rootGetters
          .getItems(state.category.items)
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
          .map(item => item.id)
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
      commit("ADD_ITEM", res.data.data , {root:true});
      commit("ADD_ITEMS", res.data.data.similar, {root:true});
      res.data.data.similar = res.data.data.similar.map( item => item.id );
      commit("ITEM", res.data.data);
    });
  },
  get_home_items({ commit }) {
    return API.post("/homeTrends", {}).then(res => {
      let { data } = res.data;
      let items = {};
      commit("ADD_ITEMS", data["items_most_popular"] , { root : true });
      commit("ADD_ITEMS", data["items_latest_trends"] , { root : true });
      commit("ADD_SETS", data["sets_best_from_modasti"] , { root : true });
      commit("ADD_SETS", data["sets_best_from_community"] , { root : true });
      Object.keys(data).forEach( key => {
        items[key] = data[key].map(item => item.id);
      });
      commit('HOME_ITEMS',items);
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
        commit("ADD_ITEMS", res.data.data);        
        commit("CATEGORY_ITEMS", { items: res.data.data.map(item => item.id) , id: catId });
        commit("CATEGORY", catId);
      });
    }
  },
  search_item({ commit, state }, searchString) {
    return search(searchString, state.searchResults.offset).then(res => {
      commit("ADD_ITEMS", res.data.data);
      commit("SEARCH_RESULTS_OFFSET");
      commit("SEARCH_RESULTS", res.data.data.map(item => item.id) );
    });
  },
  search_item_more({ commit, state }, searchString) {
    return search(searchString, state.searchResults.offset).then(res => {
      commit("ADD_ITEMS", res.data.data);      
      commit("SEARCH_RESULTS_OFFSET");
      commit("SEARCH_RESULTS_MORE", res.data.data.map(item => item.id) );
    });
  },
  search_item_offset_reset({ commit }) {
    commit("SEARCH_RESULTS_OFFSET_RESET");
  },
  like_item_toggle({commit}){
    commit("LIKE_ITEM_TOGGLE");
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
    state.categories[data.id]["items"] = data.items.slice(0, 500);
  },
  CATEGORY(state, id) {
    state.category = {
      ...state.categories[id],
      items: state.categories[id].items
    };
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
  },
  LIKE_ITEM_TOGGLE(state){
    console.log(state.item);
    if(state.item.title_en){
      state.item.is_liked = !state.item.is_liked;
      state.item.is_liked ? state.item.likes ++ : state.item.likes --;  
      state.item = {...state.item };
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
