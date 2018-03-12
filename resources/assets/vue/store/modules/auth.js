const state = {
  auth: localStorage.getItem('api_token') ? true : false,
  user: JSON.parse(localStorage.getItem('user')) || {},
  api_token: localStorage.getItem('api_token') || '',
  errors: [],
  loading: false
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
  },
  authLoading(state) {
    return state.loading;
  }
};

// actions
const actions = {
  login({ commit }, formData) {
    commit('loading');
    axios.post('/signIn', formData).then(res => {
      commit('login', res.data);
      commit('loading');
    }).catch(err => {
      commit('errors', err.response.data.errors);
      commit('loading');
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
    state.auth = false;
    state.user = {};
  },
  errors(state, errors) {
    state.errors = errors;
  },
  loading(state) {
    state.loading = !state.loading;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};