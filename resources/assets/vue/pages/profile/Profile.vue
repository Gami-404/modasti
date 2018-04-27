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
                            <div>{{user.sets_count||0}} / 15 Sets</div>
                        </div>
                    </div>
                </div>
                <router-link v-if="isCurrUser" to="/profile/edit" class="topHeadBtn">Edit Profile</router-link>
                <router-link v-if="!isCurrUser" to="/profile/edit" class="topHeadBtn brandBg blackColor">Follow</router-link>
                <div v-if="!isCurrUser" class="TUP_otherBtns">
                    <a href="#" :disabled="blockBtnLoading" @click.prevent="toggleBlock" class="mainBtn">{{ blockBtnLoading ? "Loading..":user.is_blocked ? "Unblock":"Block"}}</a>
                    <router-link :to="'?popup=new_message&userId='+user.id" class="mainBtn">send Message</router-link>
                </div>
            </div>

            <Loading v-if="loading" />
        </div>
        <ProfileNav/>
        <div v-if="!loading">
            <transition name="subpage" enter-active-class="animated fadeIn">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
        <transition name="popup_new_message" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <WrapperPopups v-if="$route.query.popup && $route.query.popup=='new_message'">
                <NewMessage v-if="$route.query.popup=='new_message'" />
            </WrapperPopups>
        </transition>
    </div>
</template>

<script>
import ProfileNav from "./ProfileNav";
import Loading from "@/components/Loading";
import WrapperPopups from "@/wrappers/WrapperPopups";
import NewMessage from "@/layout/popups/NewMessage";

export default {
  components: {
    ProfileNav,
    Loading,
    NewMessage,
    WrapperPopups
  },
  data() {
    return { loading: true, blockBtnLoading: false };
  },
  computed: {
    user() {
      return this.$store.getters.userProfile;
    },
    isCurrUser() {
      return (
        this.$store.getters.user.userId == this.$route.params.userId ||
        this.$route.params.userId == "me"
      );
    }
  },
  created() {
    this.load(this.$route.params.userId);
  },
  watch: {
    "$route.params.userId"(userId) {
      this.load(userId);
    }
  },
  methods: {
    load(userId) {
      this.loading = true;
      let id = isNaN(userId) ? this.$store.getters.user.userId : userId;
      this.$store
        .dispatch("get_user_profile", id)
        .then(() => {
          this.loading = false;
        })
        .catch(err => this.$router.push("/404"));
    },
    toggleBlock() {
      this.blockBtnLoading = true;
      this.$store.dispatch("toggle_block").then(() => {
        this.blockBtnLoading = false;
        this.$router.push("/profile/me/blocked");
      });
    }
  }
};
</script>
