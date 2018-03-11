<template>
	<div class="gridContainer">
    <WrapperCardList>
        <div class="messagesPage whiteBg">
            <MessageCard v-for="(message,i) of messages" :key="i">

            </MessageCard>
        </div>
    </WrapperCardList>
	</div>
</template>

<script>
import WrapperCardList from "../wrappers/WrapperCardList";
import MessageCard from '../MessageCard';

export default {
  components: {
    WrapperCardList,
    MessageCard
  },
  data () {
      return {
          messages:[
            {
              message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              sender:'Person name',
              img:'images/img3.jpg',
              time:'2:00'
            },
            {
              message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              sender:'Person name',
              img:'images/img3.jpg',
              time:'2:00'
            }
          ]
      }
  }
};
</script>
