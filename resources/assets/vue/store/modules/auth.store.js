import API from "../API";

const state = {
  isAuth: localStorage.getItem("api_token") ? true : false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  api_token: localStorage.getItem("api_token") || ""
};

// getters
const getters = {
  user: state => state.user,
  api_token: state => state.api_token,
  isAuth: state => state.isAuth
};

// actions
const actions = {
  login({ commit }, formData) {
    return API.post("/signIn", formData)
      .then(res => {
        commit("LOGIN", res.data);
        return res.data.errors;
      })
      .catch(err => {
        return err.response.data.errors;
      });
  },
  logout({ commit }, formData) {
    commit("LOGOUT");
  },
  register({ commit }, formData) {
    return API.post("/register", formData)
      .then(res => {
        commit("REGISTER", res.data);
        return res.data.errors;
      })
      .catch(err => {
        return err.response.data.errors;
      });
  }
};

// mutations
const mutations = {
  LOGIN(state, data) {
    if (data.errors.length == 0) {
      localStorage.setItem("api_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      state.isAuth = true;
      state.user = data.data;
      state.api_token = data.token;
    }
  },
  LOGOUT(state) {
    localStorage.removeItem("api_token");
    localStorage.removeItem("user");
    state.api_token = "";
    state.isAuth = false;
    state.user = {};
  },
  REGISTER(state, data) {
    if (data.errors.length == 0) {
      localStorage.setItem("api_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      state.isAuth = true;
      state.user = data.data;
      state.api_token = data.token;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
