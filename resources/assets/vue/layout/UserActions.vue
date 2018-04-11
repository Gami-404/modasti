<template>
    <span>
        <a href="#" class="one">
            <i class="icon-headicon"></i>
        </a>
        <router-link to="messages" class="one">
            <i class="fa fa-envelope"></i>
        </router-link>
        <div class="one notifications">
            <div class="theMain">
                <i class="fa fa-bell"></i>
                <span class="numbers">12</span>
            </div>
            <div class="theNotifications">
                <div class="in">
                    <div class="itsTitle clearfix">
                        <span> Notifications </span>
                        <span class="pull-right">
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                            </label>
                        </span>
                    </div>
                    <div class="allNotifications">
                        <a href="#" class="oneItem">
                            <img src="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" class="avatar" alt="">
                            <img src="images/3.jpg" alt="" class="theImage">
                            <span class="content">
                                <span class="message">Username Commented on your set</span>
                                <span class="time">4 minutes ago</span>
                            </span>
                        </a>
                        <a href="#" class="oneItem">
                            <img src="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" class="avatar" alt="">
                            <span class="content">
                                <span class="message">Username Commented on your set</span>
                                <span class="time">4 minutes ago</span>
                            </span>
                        </a>
                        <a href="#" class="oneItem">
                            <img src="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" class="avatar" alt="">
                            <img src="images/1.jpg" alt="" class="theImage">
                            <span class="content">
                                <span class="message">Username Commented on your set</span>
                                <span class="time">4 minutes ago</span>
                            </span>
                        </a>
                        <a href="#" class="oneItem">
                            <img src="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" class="avatar" alt="">
                            <span class="content">
                                <span class="message">Username Commented on your set</span>
                                <span class="time">4 minutes ago</span>
                            </span>
                        </a>
                        <a href="#" class="oneItem">
                            <img src="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" class="avatar" alt="">
                            <span class="content">
                                <span class="message">Username Commented on your set</span>
                                <span class="time">4 minutes ago</span>
                            </span>
                        </a>
                    </div>
                    <a href="#" class="seeAllNotifications">See All</a>
                </div>
            </div>
        </div>
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
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
