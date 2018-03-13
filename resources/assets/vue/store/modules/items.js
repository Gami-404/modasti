const state = {
  item: {},
  items:[],
};

// getters
const getters = {
  items() {
    let arr = [];
    const Items = [
      {
        url: "",
        title: "VELVET PUMPS WITH BEJEWELED HEELS",
        image: "images/4.jpg",
        price: 520,
        url: "",
        like: 10,
        comment: 10,
        link: "dolcegabbana.com",
        by: "Modasti retail - Modasti"
      },
      {
        url: "",
        title: "VELVET PUMPS WITH BEJEWELED HEELS",
        image: "images/3.jpg",
        price: 320,
        url: "",
        like: 20,
        comment: 11,
        link: "dolcegabbana.com",
        by: "Modasti retail - Modasti"
      },
      {
        url: "",
        title: "VELVET PUMPS WITH BEJEWELED HEELS",
        image: "images/1.jpg",
        price: 120,
        url: "",
        like: 5,
        comment: 2,
        link: "dolcegabbana.com",
        by: "Modasti retail - Modasti"
      }
    ];

    for (let i = 0; i < 8; i++) {
      arr.push(Items[Math.floor(Math.random() * 3)]);
    }
    return arr;
  }
};

// actions
const actions = {
  items({ commit }, id) {
    commit('loading');
    return axios.post('itemDetails', { "itemId": 0 }).then(res => {
      commit('item', res.data);
    });
  }
};

// mutations
const mutations = {
  items(state, items) {
    state.items = items;
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};