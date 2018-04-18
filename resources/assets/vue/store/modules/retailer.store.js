import API from "../API";
import axios from "axios";

const state = {
  retailer: {},
  items: [],
  offset: 0
};

// getters
const getters = {};

// actions
const actions = {
  add_new_item({ commit }, formData) {
    return API.post("/addItem", formData);
  },
  add_retailer({ commit }, retailer) {
    return API.post("/designer-register", retailer);
  },
  get_all_items({ commit, state }, formData) {
    return API.post("/listItems", {
      offset: state.offset
    }).then(res => {
      commit("ALL_ITEMS", res.data.data);
    });
  },
  delete_item({ commit }, itemId) {
    return API.post("/deleteItems", {
      itemId
    }).then(() => {
      commit("DELETE_ITEM", id);
    });
  },
  import_items({ commit, state, getters }, file) {
    let formBody = new FormData();
    formBody.append("importItems", file);
    axios.post(window.baseURL + "/importFile", formBody, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "Bearer " +
          (window._store.getters.api_token ||
            localStorage.getItem("api_token") ||
            "")
      }
    });
  }
};

// mutations
const mutations = {
  ALL_ITEMS(state, data) {
    state.items = state.items.concat(data);
    state.offset += 8;
  },
  DELETE_ITEM(state, itemId) {
    state.items = state.items.filter(item => item.id != itemId);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
