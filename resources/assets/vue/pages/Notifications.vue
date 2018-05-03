<template>
  <div class="gridContainer">
    <div class="notificationsPage secPaddLg">
      <div class="top">
        <span> Notifications </span>
        <span class="pull-right">
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </span>
      </div>
      <div class="allNotifications">
        <a v-for="notification of notifications" :key="notification.id" href="#" class="oneItem clearfix" @click.prevent="see(notification.id,notification.action)" :style="notification.seen?'background:rgb(247, 247, 247);':''">
          <img :src="notification.sender.avatar||'https://i.stack.imgur.com/1gPh1.jpg?s=328&g=1'" class="avatar" alt="">
          <!-- <img src="images/3.jpg" alt="" class="theImage"> -->
          <span class="content">
            <span class="message">{{notification.message}}</span>
            <span class="time">{{notification.since}}</span>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  components: {
    Loading
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    notifications() {
      return this.$store.getters.notifications;
    }
  },
  created() {
    this.$store.dispatch("get_notifications").then(() => {
      this.loading = false;
    });
  }
};
</script>
