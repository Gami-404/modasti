<template>
  <div class="gridContainer">

    <div class="proudctDetails secondStyle">
      <div class="clearfix">
        <div class="avatar"><img :src="set['photo'] && set['photo']['photo_name']" alt=""></div>
        <div class="content">
          <div class="in">

            <div class="paging">
              <a href="/">Home</a>
              <a href="/set">Set</a>
            </div>

            <h2 class="title">{{set.title_en}}</h2>
            <div v-html="set.text_en" class="description"></div>
            <div class="info clearfix">
                <div class="price">{{totalPrice}} $</div>
                <a v-if="set['user']" :href="'/profile/'+set['user']['id']" class="link">{{set['user']['name']}}</a>
            </div>
            <CardActions  :likeable="true" :is-liked="set.is_liked" :commentable="true" :sharable="true" :obj-id="set.id"  :num-of-likes="set.likes" :num-of-comments="set.comments_counter" context="set"/>

            <div v-if="set.user && userId == set.user.id">
              <a @click.prevent="remove" href="#" class="getMore">Edit</a>
              <a @click.prevent="remove" href="#" class="mainBtn">Remove</a>
            </div>

          </div>
        </div>
      </div>
      <div class="PD_comments">
        <div class="addComment">
          <input type="text" class="inputEle" placeholder="Add comment">
          <a href="#" class="theIcon">
            <i class="fa fa-paper-plane"></i>
          </a>
        </div>
        <div class="theComments">
          <div class="one clearfix">
            <img src="images/img3.jpg" class="avatar" alt="">
            <a href="#" class="deleteComment">Delete</a>
            <div class="itsContent">
              <div class="message">Lorem Ipsum is simply dummy text of the printing and typesetting </div>
              <div class="time">02:00</div>
            </div>
          </div>
          <div class="one clearfix">
            <img src="images/img3.jpg" class="avatar" alt="">
            <a href="#" class="deleteComment">Delete</a>
            <div class="itsContent">
              <div class="message">Lorem Ipsum is simply dummy text of the printing and typesetting </div>
              <div class="time">02:00</div>
            </div>
          </div>
        </div>
        <a href="#" class="moreLinks">More Comments</a>
      </div>
    </div>

    <WrapperCardListTitled title="Items">
      <div v-for="item in set['items']" :key='item.id' class="mycol-lg-3 mycol-sm-6">
					<ItemCard :item="item" />        
      </div>
    </WrapperCardListTitled>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import CardActions from "@/components/CardActions";
import WrapperCardListTitled from "@/wrappers/WrapperCardListTitled";
import ItemCard from "@/components/ItemCard";
export default {
  components: {
    Loading,
    CardActions,
    WrapperCardListTitled,
    ItemCard
  },
  computed: {
    set() {
      return this.$store.getters.set;
    },
    totalPrice(){
      return this.set["items"] ? this.set["items"].reduce((sum , item ) => sum + parseFloat( item.price ) , 0).toFixed(2) : "000";
    },
    userId() {
      return this.$store.getters.userId;
    }
  },
  data() {
    return {
      loading: true
    };
  },
  created() {
    this.$store
      .dispatch("get_set_details", this.$route.params.setId)
      .then(() => (this.loading = false)).catch( err => this.$router.push('/404') );
  },
  watch: {
    "$route.params.setId"(setId) {
      if (!setId) return;
      this.loading = true;
      this.$store
        .dispatch("get_set_details", this.$route.params.setId)
        .then(() => (this.loading = false)).catch( err => this.$router.push('/404') );
    }
  },
  methods: {
    remove() {
      this.loading;
      this.$store.dispatch("remove_set", this.set.setId).then(() => {
        this.$router.push("/profile/me/sets");
        this.loading = false;
      });
    },
    remove() {
      this.loading;
      this.$store.dispatch("remove_set", this.set.setId).then(() => {
        this.$router.push("/profile/me/sets");
        this.loading = false;
      });
    }
  }
};
</script>
