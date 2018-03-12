const state = {
  auth: localStorage.getItem('api_token') ? true : false,
  user: JSON.parse(localStorage.getItem('user')) || {},
  api_token: localStorage.getItem('api_token') || '',
  errors: [],
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
    return axios.post('/signIn', formData).then(res => {
      commit('login', res.data);
      return res;
    }).catch(err => {
      commit('errors', err.response.data.errors);
      return err;
    });
  },
  logout({ commit }, formData) {
    commit('logout');
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
    } else {
      state.errors = data.errors;
    }
  },
  logout(state) {
    localStorage.removeItem('api_token');
    state.api_token = '';
    state.auth = false;
    state.user = {};
  },
  errors(state, errors) {
    state.errors = errors;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};