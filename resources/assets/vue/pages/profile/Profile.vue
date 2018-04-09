<template>
    <div id="profile">
        <div class="secPaddLg whiteBg">
            <div class="gridContainer">
                <div class="top_userProfile clearfix">
                    <div class="avatar"><img src="images/img2.jpg" alt=""></div>
                    <div class="content">
                        <div class="info">
                            <div class="name">{{user.fname}}</div>
                            <div class="other">test</div>
                        </div>
                        <div class="top_message">
                            <div>Create 15 sets to become a STYLIST!</div>
                            <hr>
                            <div>0 / 15 Sets</div>
                        </div>
                    </div>
                </div>
                <router-link v-if="isCurrUser" to="/profile/me/edit" class="topHeadBtn">Edit Profile</router-link>
            </div>
            <Loading v-if="loading" />
        </div>
        <ProfileNav/>
        <div v-if="!loading">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import ProfileNav from './components/ProfileNav';
import Loading from "@/components/Loading";
export default {
  components: {
    ProfileNav,
    Loading
  },
  data() {
    return { loading: true };
  },
  computed: {
    user() {
      return this.$store.getters.userProfile;
    },
    isCurrUser() {
      return (this.$store.getters.user.userId == this.$route.params.userId )|| this.$route.params.userId == "me";
    }
  },
  created() {
    let id =
      typeof this.$route.params.userId == "number"
        ? this.$route.params.userId
        : this.$store.getters.user.userId;
    this.$store.dispatch("get_user_profile", id).then(() => {
      this.loading = false;
    });
  }
};
</script>
