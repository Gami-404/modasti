import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue';
import Clothing from './pages/Clothing.vue';
import Profile from './pages/Profile.vue';
import Sets from './components/profile/Sets.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/clothing',
      name: 'clothing',
      component: Clothing
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile,
      children: [
        {
          path: '',
          component: Sets
        },
        // {
        //   path: 'posts',
        //   component: UserPosts
        // }
      ]
    }
  ]
});
