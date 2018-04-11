<template>
	<div class="gridContainer">
		<div class="secPaddLg">
			<div class="groupPage profileMessages">

				<div class="theChat">
					<div class="content">

						<div class="oneMessage clearfix">
							<div class="avatar">
								<img src="images/img3.jpg" alt="">
								<div class="textCentered">2:00</div>
							</div>
							<div class="theMessage">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
						</div>

						<div class="oneMessage clearfix">
							<div class="avatar">
								<img src="images/img3.jpg" alt="">
								<div class="textCentered">2:00</div>
							</div>
							<div class="theMessage">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
						</div>

						<div class="oneMessage second clearfix">
							<div class="avatar">
								<img src="images/img3.jpg" alt="">
								<div class="textCentered">2:00</div>
							</div>
							<div class="theMessage">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
						</div>

						<div class="oneMessage clearfix">
							<div class="avatar">
								<img src="images/img3.jpg" alt="">
								<div class="textCentered">2:00</div>
							</div>
							<div class="theMessage">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
						</div>

						<div class="oneMessage second clearfix">
							<div class="avatar">
								<img src="images/img3.jpg" alt="">
								<div class="textCentered">2:00</div>
							</div>
							<div class="theMessage">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
						</div>

					</div>
					<div class="sendNew">
						<div class="theInput">
							<input v-model="messageToSend" type="text">
						</div>
						<a href="#" @click.prevent="sendMessage" class="theIcon">
							<i v-if="!sending" class="fa fa-paper-plane"></i>
							<i v-if="sending" class="fa fa-spinner fa-spin"></i>
						</a>
					</div>
				</div>

				<div class="onlinePersons">
					<div class="title">Online</div>
					<div class="content">
						<a v-for="user of MessagesFromUsers" :key="user.id" href="#" class="item">
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
    MessageCard
  },
  data() {
    return {
      loading: true,
			loadMoreLoading: false,
			messageToSend:"",
			sending:false,
			loading:true,
			loadingMessages:false,
			viewedUserId: -1
    };
  },
  computed: {
    // user messages related stuff  is in the store's auth module
		...mapGetters(["user", "MessagesFromUsers"]),
		messages(){
			return this.$store.getters.getMessages(this.viewedUserId);
		}
	},
	created(){
		this.$store.dispatch("get_users_messages").then( () => this.loading = false )
	},
  methods: {
    loadMessages() {
			if(viewedUserId != -1 ){
				this.loadingMessages = true;
				return this.$store.dispatch("get_messages").then( () => this.loadingMessages = false );
			}
    },
    loadMore() {
			//TODO
      // this.loadMoreLoading = true;
      // this.loadMessages().then(() => (this.loadMoreLoading = false));
		},
		sendMessage(){
			this.sending = true;
			this.dispatch("send_message", { message : this.messageToSend , userId : this.viewedUserId  }).then( () => {
				this.sending = false;
			});
		}
  }
};
</script>
