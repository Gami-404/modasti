import Profile from './pages/Profile';
//Profile sub pages
import ProfileSets from "./components/profile/Sets";
import ProfileCollections from "./components/profile/Collections";
import ProfileItems from "./components/profile/Items";
import ProfileLikes from "./components/profile/Likes";
import ProfileWins from "./components/profile/Wins";
import ProfileFollowing from "./components/profile/Following";
import ProfileFollowers from "./components/profile/Followers";
import ProfileBlocked from "./components/profile/Blocked";
import ProfileMessages from "./components/profile/Messages";

export default {
  path: "/profile/:id",
  component: Profile,
  children: [
    {
      path: "blocked",
      component: ProfileBlocked
    },
    {
      path: "collections",
      component: ProfileCollections
    },
    {
      path: "followers",
      component: ProfileFollowers
    },
    {
      path: "following",
      component: ProfileFollowing
    },
    {
      path: "following",
      component: ProfileFollowing
    },
    {
      path: "items",
      component: ProfileItems
    },
    {
      path: "likes",
      component: ProfileLikes
    },
    {
      path: "sets",
      component: ProfileSets
    },
    {
      path: "wins",
      component: ProfileWins
    },
    {
      path: "messages",
      component: ProfileMessages
    },
    { path: "/", redirect: "sets" },
    { path: "**", redirect: "sets" }
  ]
};
