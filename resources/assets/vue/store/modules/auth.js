import API from '../api';

const state = {
  auth: false,
  user:{},
};

// getters
const getters = {

};

// actions
const actions = {
    login: ({ commit }, formData )=>{
      API.post('/signIn',formData).then( res =>{
        console.log(res);
      });
    }
};

// mutations
const mutations = {
  login: (state,user) =>{
    state.user = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};