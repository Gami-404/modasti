import API from "../API";

const state = {
    set: {},
    setComments: [],
    itemsToAdd: [],
    offsets: [0, 0, 0, 0],
    itemsToAddSet:[],
    itemsToAddSetOffset:0,
};

// getters
const getters = {
    set: state => state.set,
    setComments: state => state.setComments,
    setTotalPrice: (state, _, __, rootGetters) =>
        state.set.items
            ? state.set.items
                .reduce(
                    (sum, itemId) =>
                        sum + parseFloat(rootGetters.getItem(itemId).price),
                    0
                )
                .toFixed(2)
            : "000",
    itemsToAdd: state => id => state.itemsToAdd[id],
    itemsToAddSet: state => state.itemsToAddSet,
};

// actions
const actions = {
    get_set_details({commit, state}, setId) {
        if (setId == state.set.id) return Promise.resolve();
        return API.post("/setDetails", {
            setId
        }).then(res => {
            commit("ADD_ITEMS", res.data.data.set.items, {root: true});
            res.data.data.set.items = res.data.data.set.items.map(item => item.id);
            commit("SET", res.data.data.set);
        });
    },
    add_set({commit}, payload) {
        return API.post("/addSet", payload);
    },
    edit_set({commit}, payload) {
        return API.post("/editSet", payload);
    },
    remove_set({commit}, setId) {
        return API.post("/deleteSet", {
            setId
        }).then(res => {
            commit("REMOVE_SET", res.data.data.set);
        });
    },
    like_set_toggle({commit}) {
        commit("LIKE_SET_TOGGLE");
    },
    get_set_comments({commit}, setId) {
        return API.post("/getSetComments", {
            setId,
            limit: 30
        }).then(res => {
            commit("SET_COMMENTS", res.data.data.comments);
        });
    },
    add_comment_to_set({commit, dispatch}, payload) {
        return API.post("/addCommentToSet", {
            setId: payload.setId,
            text: payload.comment,
            parentId: "0"
        }).then(() => dispatch("get_set_comments", payload.setId));
    },
    delete_comment_from_set({commit, dispatch}, {setId, commentId}) {
        return API.post("/deleteComment", {
            commentId
        }).then(() => dispatch("get_set_comments", setId));
    },
    get_items_for_add_set({commit, state, rootGetters}, query) {
        if (query) {
            return Promise.all(itemsToAddWithSearch(rootGetters.userId, 0, query)).then(resArray => {
                resArray.forEach(res => {
                    commit("ADD_ITEMS", res.data.data, {root: true});
                });
                commit("CLEAR_FOR_ADD_SEST", resArray.map(res => res.data.data));
                // CLEAR_FOR_ADD_SEST
            });
        }
        return Promise.all(itemsToAdd(rootGetters.userId)).then(resArray => {
            resArray.forEach(res => {
                commit("ADD_ITEMS", res.data.data, {root: true});
            });
            commit("ITEMS_FOR_ADD_SEST", resArray.map(res => res.data.data));
        });
    },
    set_load_more_to_add({commit, state, rootGetters}, view) {
        return itemsToAdd(rootGetters.userId, state.offsets[view])[view].then(
            res => {
                commit("ADD_ITEMS", res.data.data, {root: true});
                commit("LOAD_MORE_ITEMS_FOR_ADD_SEST", {data: res.data.data, view});
            }
        );
    },
    get_items_for_add_set_v2({commit, state, rootGetters},q) {
        console.log(q);
        return API.post("/getSearchForAddSet", {
            query: q.query,
            category:q.category,
            color: q.color,
            offset:q.clearOffset?0:state.itemsToAddSetOffset,
            limit:6
        }).then((res) =>{
            if(q.clearOffset){
                commit("ITEMS_TO_ADD_SET_OFFSET_CLEAR");
            }
            commit("ADD_ITEMS", res.data.data, {root: true});
            commit("ITEMS_TO_ADD_SET", res.data.data);
        });

    },
};

// mutations
const mutations = {
    SET(state, data) {
        state.set = data;
    },
    REMOVE_SET(state) {
        state.set = {};
    },
    LIKE_SET_TOGGLE(state) {
        if (state.set.title_en) {
            state.set.is_liked = !state.set.is_liked;
            state.set.is_liked ? state.set.likes++ : state.set.likes--;
            state.set = {...state.set};
        }
    },
    SET_COMMENTS(state, data) {
        state.setComments = data;
    },
    ITEMS_FOR_ADD_SEST(state, arrayOfData) {
        state.offsets = state.offsets.map(i => i + 6);
        state.itemsToAdd = arrayOfData;
    },
    LOAD_MORE_ITEMS_FOR_ADD_SEST(state, payload) {
        state.offsets[payload.view] += 6;
        state.itemsToAdd[payload.view] = state.itemsToAdd[payload.view].concat(
            payload.data
        );
        state.itemsToAdd = [...state.itemsToAdd];
    },
    CLEAR_FOR_ADD_SEST(state, arrayOfData) {
        state.offsets =[0,0,0,0]
        state.itemsToAdd = arrayOfData;
    },
    ITEMS_TO_ADD_SET(state,data){
        state.itemsToAddSet = data;
        state.itemsToAddSetOffset+=6;
    },
    ITEMS_TO_ADD_SET_OFFSET_CLEAR(state){
        state.itemsToAddSetOffset=0;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

function itemsToAdd(userId, offset) {
    offset = offset || 0;
    return [
        API.post("/getLikedItems", {
            userId: userId,
            offset: offset,
            limit: 6
        }),
        API.post("/getItemsFromCategory", {
            offset: offset,
            categoryId: 1
        }),
        API.post("/getItemsFromCategory", {
            offset: offset,
            categoryId: 4
        }),
        API.post("/getItemsFromCategory", {
            offset: offset,
            categoryId: 6
        }),
        API.post("/getItemsFromCategory", {
            offset: offset,
            categoryId: 24
        })
    ];
}

function itemsToAddWithSearch(userId, offset, query) {
    offset = offset || 0;
    return [
        API.post("/getLikedItems", {
            userId: userId,
            offset: offset,
            limit: 6,
            q: query
        }),
        API.post("/getItemsFromCategory", {
            offset: offset,
            categoryId: 1,
            q: query
        }),
        API.post("/getItemsFromCategory", {
            offset: offset,
            categoryId: 4,
            q: query
        }),
        API.post("/getItemsFromCategory", {
            offset: offset,
            categoryId: 6,
            q: query
        }),
        API.post("/getItemsFromCategory", {
            offset: offset,
            categoryId: 24,
            q: query
        })
    ];
}
