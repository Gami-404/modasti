import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home';
import Clothing from './pages/Clothing';
import Contests from './pages/Contests';
import Product from './pages/Product';
import Single from './pages/Single';
import Profile from './pages/Profile';
  //Profile sub pages
  import ProfileSets from './components/profile/SubPageSets';
  import ProfileCollections from './components/profile/SubPageCollections';
  import ProfileItems from './components/profile/SubPageItems';
  import ProfileLikes from './components/profile/SubPageLikes';
  import ProfileWins from './components/profile/SubPageWins';
  import ProfileFollowing from './components/profile/SubPageFollowing';
  import ProfileFollowers from './components/profile/SubPageFollowers';
  import ProfileBlockedUsers from './components/profile/SubPageBlockedUsers';
  import ProfileMessages from './components/profile/SubPageMessages';

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
      path: '/contests',
      name: 'contests',
      component: Contests
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/page/:slug',
      name: 'page',
      component: Single
    },
    {
      path: '/profile/:id',
      component: Profile,
      children: [
        {
          path: 'blockedusers',
          component: ProfileBlockedUsers
        },
        {
          path: 'collections',
          component: ProfileCollections
        },
        {
          path: 'followers',
          component: ProfileFollowers
        },  
        {
          path: 'following',
          component: ProfileFollowing
        },
        {
          path: 'following',
          component: ProfileFollowing
        },
        {
          path: 'items',
          component: ProfileItems
        },
        {
          path: 'likes',
          component: ProfileLikes
        },
        {
          path: 'sets',
          component: ProfileSets
        },
        {
          path: 'wins',
          component: ProfileWins
        },
        {
          path: 'messages',
          component: ProfileMessages
        },
        { path: '/', redirect: '/sets' },        
      ]
    }
  ]
});
