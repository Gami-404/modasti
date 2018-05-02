import API from "../API";

const state = {
  contests: {
    new: [],
    old: []
  },
  contest: {}
};

// getters
const getters = {
  newContests: state => state.contests.new,
  oldContests: state => state.contests.old,
  contest: state => state.contest
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
          _new.push(item);
        } else {
          item._type = "old";
          _old.push((item));
        }
      });
      commit("NEW_CONTESTS", _new);
      commit("OLD_CONTESTS", _old);
    });
  },
  get_contest_details({ commit , dispatch , state }, contestId) {

    let getContest = () => {
      return API.post("/getContestPhotos", {
        contestId: contestId
      }).then(res => {
        commit("CONTEST", { photos: res.data, contestId });
      });
    };

    if( state.contests.new.length + state.contests.old.length  == 0 ){
      return dispatch("get_all_contests").then( ()=>{
        return getContest();
      })
    }else{
      return getContest();
    }
  },
  join_contest({commit},payload){
    return API.post("/publishContestPhoto", payload);
  }
};

// mutations
const mutations = {
  NEW_CONTESTS(state, data) {
    state.contests.new = data;
  },
  OLD_CONTESTS(state, data) {
    state.contests.old = data;
  },
  CONTEST(state, data) {
    state.contests.old.forEach(item => {
      if (item.id == data.contestId) {
        data.contest = item;
        state.contest = data;
      }
    });
    state.contests.new.forEach(item => {
      if (item.id == data.contestId) {
        data.contest = item;
        state.contest = data;
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
