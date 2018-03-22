import API from '../api';

const state = {
  auth: localStorage.getItem('api_token') ? true : false,
  user: JSON.parse(localStorage.getItem('user')) || {},
  api_token: localStorage.getItem('api_token') || '',
};

// getters
const getters = {
  user(state) {
    return state.user;
  },
  errors(state) {
    return state.errors;
  },
  api_token(state) {
    return state.api_token;
  },
  auth(state) {
    return state.auth;
  }
};

// actions
const actions = {
  login({ commit }, formData) {
    return API.post('/signIn', formData).then(res => {
      commit('login', res.data);
      return res.data;
    }).catch(err => {
      return err.response.data;
    });
  },
  logout({ commit }, formData) {
    commit('logout');
  },
  register({ commit }, formData) {
    return API.post('/register', formData).then(res => {
      commit('register', res.data);
      return res.data;
    }).catch(err => {
      return err.response.data;
    });
  }

};

// mutations
const mutations = {
  login(state, data) {
    if (data.errors.length == 0) {
      localStorage.setItem('api_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      state.auth = true;
      state.user = data.data;
      state.api_token = data.token;
    } else {
      state.errors = data.errors;
    }
  },
  logout(state) {
    localStorage.removeItem('api_token');
    state.api_token = '';
    state.auth = false;
    state.user = {};
    state.errors = [];
  },
  register(state,data){
    if (data.errors.length == 0) {
      localStorage.setItem('api_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      state.auth = true;
      state.user = data.data;
      state.api_token = data.token;      
    } else {
      state.errors = data.errors;
    }
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};