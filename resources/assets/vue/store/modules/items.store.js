import API from "../API";

const state = {
  item: {},
  items: {
    itemsMostPopular: [],
    setsBestFromCommunity: [],
    itemsLatestTrends: [],
    setsBestFromModasti: []
  },
  categories: [],
  category: {},
  catIdMap: {}
};

// getters
const getters = {
  item: state => state.item,
  itemsMostPopular: state => state.items.itemsMostPopular,
  itemsLatestTrends: state => state.items.itemsLatestTrends,
  setsBestFromCommunity: state => state.items.setsBestFromCommunity,
  setsBestFromModasti: state => state.items.setsBestFromModasti,
  category: state => state.category
};

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
  like_item({ commit }, objId){
    console.log(objId);
    return API.post('/switchLike', {
        objId,
        targetObject: "item"
    });
  }
};

// mutations
const mutations = {
  ITEM(state, data) {
    state.item = data;
  },
  HOME_ITEMS(state, data) {
    state.items.itemsMostPopular = data.items_most_popular;
    state.items.itemsLatestTrends = data.items_latest_trends;
    state.items.setsBestFromModasti = data.sets_best_from_modasti;
    state.items.setsBestFromCommunity = data.sets_best_from_community;
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
    state.categories[data.id]["items"] = data.items;
  },
  CATEGORY(state, id) {
    state.category = state.categories[id];
  },
  LIKE(state, id){
    
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
