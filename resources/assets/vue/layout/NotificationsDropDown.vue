<template>
<div class="one notifications">
    <div class="theMain">
        <i class="fa fa-bell"></i>
        <span class="numbers">{{unseenCount}}</span>
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
              <router-link v-for="notification of notifications" :key="notification.id" href="#" class="oneItem">
                  <img :src="notification.sender.avatar" class="avatar" alt="">
                  <!-- <img src="images/3.jpg" alt="" class="theImage"> -->
                  <span class="content">
                      <span class="message"> {{notification.message}} </span>
                      <span class="time">{{notification.since}}</span>
                  </span>
              </router-link>
              <br>
              <h3 v-if="!notifications.length" style="text-align:center"> No Unseen Notifications </h3>
                <br>
            </div>
            <router-link to="/notifications" class="seeAllNotifications">See All</router-link>
        </div>
  </div>
</div>
  
</template>

<script>
export default {
  created() {
      this.$store.dispatch("update_notifications");
      setInterval( () =>{ 
          this.$store.dispatch("update_notifications");
      }, 45000 );
  },
  computed: {
    notifications() {
      return this.$store.getters.nav;
    },
    unseenCount(){
        return this.$store.getters.unseenCount;
    }
  }
};
</script>
