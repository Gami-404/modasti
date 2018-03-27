<template>
  <div>
    
    <div class="secPaddLg whiteBg">
      <div class="gridContainer">
        <div class="top_userProfile clearfix">
          <div class="avatar"><img src="images/img2.jpg" alt=""></div>
          <div class="content">
            <div class="info">
              <div class="name">Nada Mohamed</div>
              <div class="other">test</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="gridContainer">
      <WrapperCardList>
        <div class="messagesPage whiteBg">
          <MessageCard v-for="(message,i) of messages" :key="i" :message="message.message" :sender="message.sender" :img="message.img" :time="message.time" />
        </div>
      </WrapperCardList>
    </div>
  </div>
</template>

<script>
import WrapperCardList from "@/wrappers/WrapperCardList";
import MessageCard from "@/components/MessageCard";

export default {
  components: {
    WrapperCardList,
    MessageCard
  },
  data() {
    return {
      messages: [
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          sender: "Person name",
          img: "images/img3.jpg",
          time: "2:00"
        },
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          sender: "Person name",
          img: "images/img3.jpg",
          time: "2:00"
        }
      ]
    };
  }
};
</script>
