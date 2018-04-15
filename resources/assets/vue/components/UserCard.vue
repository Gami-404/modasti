<template>
  <div class="mycol-lg-3 mycol-md-4 mycol-sm-6">
    <div class="userCard textCentered">
      <div class="avatar"><img :src="user.photo && user.photo.photo_name == 'string' ? user.photo.photo_name : 'https://i.stack.imgur.com/1gPh1.jpg?s=328&g=1' " alt=""></div>
      <div class="name">{{user.fname|| user.username}}</div>
      <!-- <div class="joined">{{date}}</div> -->
      <a href="#" @click.prevent="toggleFollow" class="followBtn" :class="{ 'follow': !following }">
        <i v-if="!canChange" class="fa fa-spinner fa-spin"></i>
        <span v-if="canChange" >{{following ? 'unfollow':'follow' }}</span> 
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userId"],
  data() {
    return {
      following: this.$store.getters.getUser(this.userId).is_followed,
      canChange: true
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser(this.userId);
    },
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  watch: {
    "user.is_followed"(following) {
      console.log("CHANGED");
      this.following = following;
      this.canChange = true;
    }
  },
  methods: {
    toggleFollow() {
      if (this.isAuth) {
        if (this.canChange) {
          let action = this.following ? "unfollow_user" : "follow_user";
          this.following = !this.following;
          this.$store.dispatch(action, this.userId);
        }
        this.canChange = false;
      } else {
        this.openLogin();
      }
    }
  }
};
</script>

