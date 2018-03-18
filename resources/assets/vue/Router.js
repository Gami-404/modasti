import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home';
import Category from './pages/Category';
import Contests from './pages/Contests';
import Item from './pages/Item';
import SearchItems from './pages/SearchItems';
import SearchUsers from './pages/SearchUsers';
import Single from './pages/Single';
import RouterProfile from './RouterProfile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contests',
      name: 'contests',
      component: Contests
    },
    {
      path: '/item',
      name: 'item',
      component: Item
    },
    {
      path: '/search/items',
      name: 'items',
      component: SearchItems
    },
    {
      path: '/search/users',
      name: 'users',
      component: SearchUsers
    },
    {
      path: '/page/:slug',
      name: 'page',
      component: Single
    },
    {
      path: '/category/:name',
      name: 'category',
      component: Category
    },
    { path:'/category' , redirect: '/category/clothing' },
    RouterProfile
  ]
});
