import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import users from './modules/users'
import sets from './modules/sets'
import products from './modules/products'
import collections from './modules/collections'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    sets,
    products,
    collections
  }
})