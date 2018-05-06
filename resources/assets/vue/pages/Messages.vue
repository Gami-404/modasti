<template>
  <div class="gridContainer">
    <div class="secPaddLg">
      <div class="groupPage profileMessages">
        <div class="theChat">
          <div class="content">
            <div class="no-user" v-if="currMessagingUserId==-1">
              <span v-if="!loadingMessages">No Messages To View</span>
            </div>
            <div class="no-user">
              <i v-if="loadingMessages" class=" no-user fa fa-spinner fa-spin"></i>
            </div>
            <div v-if="!loadingMessages">
              <div v-for="(message,i) of messages" :key="i" class="oneMessage clearfix" :class="{'second': message.from_id == $store.getters.user.userId}">
                <div class="avatar">
                  <img src="images/img3.jpg" alt="">
                  <div class="textCentered">{{message.created}}</div>
                </div>
                <div class="theMessage">{{message.text_en}}</div>
              </div>
            </div>
          </div>
          <div v-if="currMessagingUserId!==-1" class="sendNew">
            <div class="theInput">
              <input @keyup.enter="sendMessage" v-model="messageToSend" type="text">
            </div>
            <a href="#" @click.prevent="sendMessage" class="theIcon">
              <i v-if="!sending" class="fa fa-paper-plane"></i>
              <i v-if="sending" class="fa fa-spinner fa-spin"></i>
            </a>
          </div>
        </div>
        <div class="onlinePersons">
          <div class="title">Chats</div>
          <div class="content">
            <a v-for="user of messagesFromUsers" :key="user.id" href="#" @click.prevent="loadMessages(user.id)" class="item" :class="{'selected-user': user.id == currMessagingUserId}">
              <span class="avatar"><img :src="user.photo && user.photo.photo_name == 'string' ? user.photo.photo_name : 'https://i.stack.imgur.com/1gPh1.jpg?s=328&g=1'" alt=""></span>
              <span> {{user.fname || user.username}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import WrapperCardList from "@/wrappers/WrapperCardList";
import MessageCard from "@/components/MessageCard";
import Loading from "@/components/Loading";
import { mapGetters } from "vuex";
export default {
  components: {
    WrapperCardList,
    MessageCard,
    Loading
  },
  data() {
    return {
      loading: true,
      loadMoreLoading: false,
      messageToSend: "",
      sending: false,
      loading: true,
      loadingMessages: false
    };
  },
  computed: {
    // user messages related stuff  is in the store's auth module
    ...mapGetters(["user", "messagesFromUsers", "currMessagingUserId"]),
    messages() {
      return this.$store.getters.getMessages;
    }
  },
  created() {
    this.$store
      .dispatch("get_users_messages")
      .then(() => (this.loading = false));
    console.log(this.$store.getters.userId);
  },
  methods: {
    loadMessages(userId) {
      this.loadingMessages = true;
      return this.$store
        .dispatch("get_messages", userId)
        .then(() => (this.loadingMessages = false));
    },
    loadMore() {
      //TODO
      // this.loadMoreLoading = true;
      // this.loadMessages().then(() => (this.loadMoreLoading = false));
    },
    sendMessage() {
      this.sending = true;
      this.$store.dispatch("send_message", this.messageToSend).then(() => {
        this.sending = false;
      });
      this.messageToSend = "";
    }
  }
};
</script>

<style scoped>
.textCentered {
  font-size: 9px;
}
.no-user {
  font-size: 1.6em;
  position: relative;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
.selected-user {
  background: #ffd6d2;
}
</style>
