import API from "../API_local";

const state = {
    retailer: {},
    items: [],
    offset: 0,
};

// getters
const getters = {};

// mutations
const mutations = {
    ALL_ITEMS(state, data) {
        state.items = state.items.concat(data);
        state.offset += 8;
    }
};

// actions
const actions = {
    add_new_item({commit}, formData) {
        return API.post("/", formData);
    },
    add_retailer({commit}, retailer) {
        return API.post("/", retailer);
    },
    get_all_items({commit, state}, formData) {
        return API.post("/", {
            offset: state.offset
        }).then(res => {
            commit("ALL_ITEMS", res.data.data);
        });
    }
};



export default {
    state,
    getters,
    actions,
    mutations
};
