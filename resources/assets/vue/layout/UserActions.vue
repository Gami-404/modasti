<template>
    <span>
        <a href="#" class="one">
            <i class="icon-headicon"></i>
        </a>
        <router-link to="/messages" class="one">
            <i class="fa fa-envelope"></i>
        </router-link>
        <NotificationsDropDown/>
        <div class="one theUser">
            <router-link to="/profile/me">
                <img src="https://i.stack.imgur.com/1gPh1.jpg?s=328&g=1" alt="">
                <span>{{user.name}}</span>
                <i class="fa fa-angle-down"></i>
            </router-link>
        </div>

    </span>
</template>
<script>
import NotificationsDropDown from "./NotificationsDropDown";

export default {
    components:{
        NotificationsDropDown
    },
    computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
