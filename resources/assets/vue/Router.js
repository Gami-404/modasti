import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue';
import Clothing from './pages/Clothing.vue';
import Single from './pages/Single.vue';
import Profile from './pages/Profile.vue';
  //Profile sub pages
  import ProfileSets from './components/profile/SubPageSets.vue';
  import ProfileCollections from './components/profile/SubPageCollections';
  import ProfileItems from './components/profile/SubPageItems.vue';
  import ProfileLikes from './components/profile/SubPageLikes.vue';
  import ProfileWins from './components/profile/SubPageWins.vue';
  import ProfileFollowing from './components/profile/SubPageFollowing.vue';
  import ProfileFollowers from './components/profile/SubPageFollowers.vue';
  import ProfileBlockedUsers from './components/profile/SubPageBlockedUsers.vue';
  import ProfileMessages from './components/profile/SubPageMessages.vue';

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
