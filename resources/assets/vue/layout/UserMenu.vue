<template>
  <div class="one theUser">
    <div class="dropdown">
      <router-link @mouseover="hover=true" @mouseout="hover=false" to="/profile/me">
        <img src="https://i.stack.imgur.com/1gPh1.jpg?s=328&g=1" alt="">
        <span>{{username}}</span>
        <i class="fa fa-angle-down"></i>
      </router-link>
      <div v-if="hover" class="dropdown-content">
        <router-link to="/set/add" class="addlinks">new set</router-link>
        <router-link to="/collection/add" class="addlinks">new collection</router-link>
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
  opacity: 0;
  transition: opacity 0.4s ease-out;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px 14px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  opacity: 1;
}
</style>
