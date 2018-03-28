import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.store'
import users from './modules/users.store'
import sets from './modules/sets.store'
import items from './modules/items.store'
import collections from './modules/collections.store'
import contests from './modules/contests.store'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    sets,
    items,
    collections,
    contests
  }
})