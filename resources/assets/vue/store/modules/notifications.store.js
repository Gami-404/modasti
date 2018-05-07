import API from "../API";

const state = {
  nav: [],
  unseenCount: 2,
  notifications: [],
  offset: 0
};

// getters
const getters = {
  nav: state => state.nav,
  notifications: state => state.notifications,
  unseenCount: state => state.unseenCount
};

// actions
const actions = {
  get_notifications({ commit, state }) {
    return API.post("/getNotifications", { offset: state.offset }).then(res => {
      commit("NOTIVICATIONS", res.data.data);
    });
  },
  update_notifications({ commit, state }) {
    return API.post("/getNotifications", {}).then(res => {
      commit("NAV", res.data.data);
    });
  },
  see({ commit }, id) {
    commit("SEE", id);
    return API.post("/setNotificationSeen", { notificationId: id });
  }
};

// mutations
const mutations = {
  NOTIVICATIONS(state, data) {
    state.notifications = state.notifications.concat(data.notifications);
  },
  NAV(state, data) {
    state.nav = data.notifications;
    state.unseenCount = data.unseen_count;
  },
  SEE(state, id) {
    state.nav.forEach(element => {
      if (element.id == id) {
        state.unseenCount--;
        element.seen = 1;
        element = { ...element };
        state.nav = [...state.nav];
      }
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
