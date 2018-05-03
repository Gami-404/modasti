<template>
  <div class="one theUser">
    <div class="dropdown">
      <router-link to="/profile/me">
        <img src="https://i.stack.imgur.com/1gPh1.jpg?s=328&g=1" alt="">
        <span>{{username}}</span>
        <i class="fa fa-angle-down"></i>
      </router-link>
      <div class="dropdown-content">
        <router-link to="/profile/me/sets" class="addlinks">Sets</router-link>
        <router-link to="/profile/me/collections" class="addlinks">collections</router-link>
        <router-link to="/profile/me/likes" class="addlinks">LIKES</router-link>
        <router-link to="/profile/me/Following" class="addlinks">Following</router-link>
        <router-link to="/profile/me/Followers" class="addlinks">Followers</router-link>
        <router-link to="/messages" class="addlinks">Messages</router-link>
        <hr>
        <a href="#" class="addlinks" @click.prevent="logout">LOGOUT</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["username"],
  data() {
    return {
      hover: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.addlinks {
  display: block;
  color: black !important;
  font-size: 1em;
  text-align: left;
  padding: 5px;
}
.dropdown {
  position: relative;
  display: inline-block;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

.dropdown-content {
  display: none;
  transition: opacity 0.4s ease-out;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px 14px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  transition: opacity 1s ease-in;
  display: block;
}
</style>
