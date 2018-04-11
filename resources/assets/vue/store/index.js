import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.store'
import profile from './modules/profile.store'
import _sets from './modules/sets.store'
import _items from './modules/items.store'
import _collections from './modules/collections.store'
import contests from './modules/contests.store'
import rootStore from "./root.store";

Vue.use(Vuex);

export default new Vuex.Store({
  ...rootStore,
  modules: {
    auth,
    profile,
    _sets,
    _items,
    _collections,
    contests
  }
})