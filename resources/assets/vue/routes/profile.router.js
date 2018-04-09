import Profile from "@/pages/profile/Profile";
//Profile sub pages
import ProfileSets from "@/pages/profile/components/Sets";
import ProfileCollections from "@/pages/profile/components/Collections";
import ProfileItems from "@/pages/profile/components/Items";
import ProfileLikes from "@/pages/profile/components/Likes";
import ProfileWins from "@/pages/profile/components/Wins";
import ProfileFollowing from "@/pages/profile/components/Following";
import ProfileFollowers from "@/pages/profile/components/Followers";
import ProfileBlocked from "@/pages/profile/components/Blocked";
import ProfileMessages from "@/pages/profile/Messages.vue";

export default [
  {
    path: "/profile/:userId",
    component: Profile,
    meta:{ requiresAuth : true },
    children: [
      {
        path: "blockedusers",
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
      { path: "/", redirect: "sets" }
    ]
  },
  {
    path: "/messages",
    name:"messages",
    component: ProfileMessages
  }
];
