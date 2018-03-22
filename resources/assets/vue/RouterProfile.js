import Profile from './pages/Profile';
//Profile sub pages
import ProfileSets from "./components/profile/SubPageSets";
import ProfileCollections from "./components/profile/SubPageCollections";
import ProfileItems from "./components/profile/SubPageItems";
import ProfileLikes from "./components/profile/SubPageLikes";
import ProfileWins from "./components/profile/SubPageWins";
import ProfileFollowing from "./components/profile/SubPageFollowing";
import ProfileFollowers from "./components/profile/SubPageFollowers";
import ProfileBlockedUsers from "./components/profile/SubPageBlocked";
import ProfileMessages from "./components/profile/SubPageMessages";
import ProfileGroups from "./components/profile/SubPageGroups";

export default {
  path: "/profile/:id",
  component: Profile,
  children: [
    {
      path: "blocked",
      component: ProfileBlockedUsers
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
    {
      path:"groups",
      component : ProfileGroups
    },
    { path: "/", redirect: "sets" },
    { path: "**", redirect: "sets" }
  ]
};
