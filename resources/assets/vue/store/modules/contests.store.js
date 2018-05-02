import API from "../API";

const state = {
  contests: {
    new: [],
    old: []
  },
  contestPhotos: [],
  contestsMap: {}
};

// getters
const getters = {
  newContests: state => state.contests.new,
  oldContests: state => state.contests.old,
  contest: state => id => state.contestsMap[id]
};

// actions
const actions = {
  get_all_contests({ commit }) {
    // missing catch
    return API.post("/getContests", {
      contestId: 0,
      imageName: "string",
      image: "string"
    }).then(res => {
      let _new = [];
      let _old = [];
      res.data.forEach(item => {
        if (+new Date() <= +new Date(item.expires)) {
          item._type = "new";
          _new.push(item.id);
        } else {
          item._type = "old";
          _old.push(item.id);
        }
        commit("CONTESTSMAP", item);
      });
      commit("NEW_CONTESTS", _new);
      commit("OLD_CONTESTS", _old);
    });
  },
  get_contest_details({ commit, dispatch, state }, contestId) {
    return API.post("/getContestPhotos", {
      contestId: contestId
    }).then(res => {
      commit("CONTESTPHOTOS", { photos: res.data, contestId });
    });
  },
  join_contest({ commit }, payload) {
    return API.post("/publishContestPhoto", payload);
  },
  like_contest({ commit, dispatch }, objId) {
    return API.post("/switchLike", {
      objId,
      targetObject: "contest"
    }).then(() => {
      commit("LIKE_CONTEST_PROPAGATE", objId);
    });
  },
  like_contest_toggle() {}
};

// mutations
const mutations = {
  NEW_CONTESTS(state, data) {
    state.contests.new = data;
  },
  OLD_CONTESTS(state, data) {
    state.contests.old = data;
  },
  CONTESTPHOTOS(state, data) {
    state.contestsMap[data.contestId].photos = data.photos;
  },
  CONTESTSMAP(state, item) {
    state.contestsMap[item.id] = item;
  },
  LIKE_CONTEST_PROPAGATE(state, id) {
    state.contestsMap[id].is_liked = !state.contestsMap[id].is_liked;
    state.contestsMap[id] = { ...state.contestsMap[id] };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
