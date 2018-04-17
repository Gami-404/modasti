import API from "../API_local";

const state = {
    items: [],
    offset: 0,
};

// getters
const getters = {
  retailerItems: state =>  state.items
};


// actions
const actions = {
  add_new_item({ commit }, formData) {
    return API.post("/", formData);
  },
  register({ commit }, formData) {
    return API.post("/", formData);
  },
  get_all_items({ commit , state}, formData){
    return API.post("/listItems", {
      offset: state.offset
    }).then( res =>{
      commit("ALL_ITEMS", res.data.data );
    });
  },
  delete_item({commit}, itemId){
    return API.post("/deleteItems",{
      itemId
    }).then( ()=>{
      commit("DELETE_ITEM",id);
    });
  },
};

// mutations
const mutations = {
  ALL_ITEMS(state , data){
    state.items = state.items.concat(data);
    state.offset+=8;
  },
  DELETE_ITEM(state,itemId){
    state.items= state.items.filter( item => item.id != itemId );
  }
};



export default {
    state,
    getters,
    actions,
    mutations
};