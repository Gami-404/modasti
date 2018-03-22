import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import profile from './modules/profile'
import sets from './modules/sets'
import items from './modules/items'
import collections from './modules/collections'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    sets,
    items,
    collections
  }
})