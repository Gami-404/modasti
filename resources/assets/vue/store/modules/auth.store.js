import API from "../API";

const state = {
  isAuth: localStorage.getItem("api_token") ? true : false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  api_token: localStorage.getItem("api_token") || "",
  messagesFromUsers: [],
  messages: {
    "-1": {}
  }
};

// getters
const getters = {
  user: state => state.user,
  userId: state => state.user.id,
  api_token: state => state.api_token,
  isAuth: state => state.isAuth,
  messagesFromUsers: state => state.messagesFromUsers,
  getMessages: state => id => state.messages[id]
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
  },
  get_users_messages({ commit }) {
    return API.post("/getPrivateMessageOpponents", {}).then(res => {
      commit("MESSAGES_FROM_USERS", res.data.data);
    });
  },
  get_messages({ commit }, userId) {
    return API.post("/getPrivateMessages", {
      userId: userId,
      offset: 0,
      limit: 50
    }).then(res => {
      commit("ADD_MESSAGES", { messages: res.data.data, userId });
    });
  },
  send_message({ commit, state }, payload) {
    return API.post("/writePrivateMessage", {
      userTo: payload.userId,
      message: payload.message,
      parentMsgId: 0
    }).then(res => {
      // commit("SEND_MESSAGE" , payload );
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
  },
  ADD_MESSAGES(state, payload) {
    state.messages[payload.userId] = payload.messages;
  },
  MESSAGES_FROM_USERS(state, messagesFromUsers) {
    state.messagesFromUsers = messagesFromUsers;
  },
  SEND_MESSAGE(state, payload) {
    state.messages[payload.userId].push(payload.message);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
