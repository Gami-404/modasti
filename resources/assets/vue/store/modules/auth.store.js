import API from "../API";

const state = {
  isAuth: localStorage.getItem("api_token") ? true : false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  api_token: localStorage.getItem("api_token") || "",
  messagesFromUsers: [],
  messages: {
    "-1": {}
  },
  currMessagingUserId : -1
};

// getters
const getters = {
  user: state => state.user,
  userId: state => state.user.userId,
  api_token: state => state.api_token,
  isAuth: state => state.isAuth,
  messagesFromUsers: state => state.messagesFromUsers,
  getMessages: state => state.messages[state.currMessagingUserId],
  currMessagingUserId: state => state.currMessagingUserId
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
      commit("ADD_MESSAGES", { messages: res.data.data.reverse(), userId });
      commit("CURR_MESSAGING_USER", userId);
    });
  },
  send_message({ commit, state }, message) {
    return API.post("/writePrivateMessage", {
      userTo: state.currMessagingUserId,
      message: message,
      parentMsgId: 0
    }).then(res => {
      commit("SEND_MESSAGE" , message );
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
  SEND_MESSAGE(state, message) {
    state.messages[state.currMessagingUserId].push({ from_id: state.user.userId , text_en:message , created:"Now" });
  },
  CURR_MESSAGING_USER(state, userId){
    state.currMessagingUserId = userId;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
