import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import users from './modules/users'
import sets from './modules/sets'
import items from './modules/items'
import collections from './modules/collections'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    sets,
    items,
    collections
  }
})