import API from "../API";

const state = {
  item: {},
  items: {
    items_most_popular: [],
    sets_best_from_community: [],
    items_latest_trends: [],
    sets_best_from_modasti: []
  }
};

// getters
const getters = {
  item: state => state.item,
  items_most_popular: state => state.items.items_most_popular,
  items_latest_trends: state => state.items.items_latest_trends,
  sets_best_from_community: state => state.items.sets_best_from_community,
  sets_best_from_modasti: state => state.items.sets_best_from_modasti
};

// actions
const actions = {
  get_item({ commit }, id) {
    return API.post("/itemDetails", {
      "itemId": id
    }).then(res => {
      commit("ITEM", res.data.data);
    });
  },
  get_home_items({ commit }) {
    return API.post("/homeTrends", {}).then(res => {
      commit("HOME_ITEMS", res.data.data);
    });
  }
};

// mutations
const mutations = {
  ITEM(state, data) {
    state.item = data;
  },
  HOME_ITEMS(state, data) {
    state.items.items_most_popular = data.items_most_popular;
    state.items.items_latest_trends = data.items_latest_trends;
    state.items.sets_best_from_modasti = data.sets_best_from_modasti;
    state.items.sets_best_from_community = data.sets_best_from_community;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
