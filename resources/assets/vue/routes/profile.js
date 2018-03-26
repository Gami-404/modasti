import Profile from './pages/Profile/Profile';
//Profile sub pages
import ProfileSets from "./pages/Profile/components/Sets";
import ProfileCollections from "./pages/Profile/components/Collections";
import ProfileItems from "./pages/Profile/components/Items";
import ProfileLikes from "./pages/Profile/components/Likes";
import ProfileWins from "./pages/Profile/components/Wins";
import ProfileFollowing from "./pages/Profile/components/Following";
import ProfileFollowers from "./pages/Profile/components/Followers";
import ProfileBlocked from "./pages/Profile/components/Blocked";
import ProfileMessages from "./pages/Profile/components/Messages.vue";

export default {
  path: "/profile/:id",
  component: Profile,
  
};