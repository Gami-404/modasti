import API from '../API';

const state = {
  
};

// getters
const getters = {

};

// actions
const actions = {
  like_set({ commit }, objId){
    console.log(objId);
    return API.post('/switchLike', {
        objId,
        targetObject: "set"
    });
  }
};

// mutations
const mutations = {
  
};

export default {
  state,
  getters,
  actions,
  mutations
};