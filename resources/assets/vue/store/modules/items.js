import mock from './mocks/items.mock';

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
    item({ commit },id) {
        setTimeout(() => {
            commit("ITEM", mock(8)[0]);
        }, 300);
    },
    home_items({commit}) {
        API.post("/homeTrends", {}).then(res => {
            commit("HOME_ITEMS", res.data.data );
        });
    }
};

// mutations
const mutations = {
    ITEM(state, data) {
        state.item = data;
    },
    ITEMS(state, data) {
        state.items = data;
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