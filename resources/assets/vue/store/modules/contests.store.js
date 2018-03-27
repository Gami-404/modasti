import API from "../API";

const state = {
  contests: {
    new: [],
    old: []
  },
  contest:{}
};

// getters
const getters = {
  newContests: state => state.contests.new,
  oldContests: state => state.contests.old
};

// actions
const actions = {
  get_all_contests({ commit }) {
    return API.post("/getContests", {
      contestId: 0,
      imageName: "string",
      image: "string"
    }).then(res => {
        let _new =[];
        let _old =[];
        res.data.forEach( item => { 
            +new Date() <= +new Date(item.expires) ? _old.push(item) : _new.push(item)
        });
        commit( "NEW_CONTESTS" , _new );
        commit( "OLD_CONTESTS" , _old );
    });
  },
  get_contest_details( {commit}, contestId){
    return API.post('/getContestPhotos',{
      "contestId": contestId
    }).then( res =>{
      
    });
  }
};

// mutations
const mutations = {
    NEW_CONTESTS(state,data){
        console.log(data);        
        state.contests.new = data;
    },
    OLD_CONTESTS(state,data){
        console.log(data);
        state.contests.old = data;
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};
