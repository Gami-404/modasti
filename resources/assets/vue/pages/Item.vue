<template>
    <div class="gridContainer">
        <div v-if="!loading">
            <div class="proudctDetails">
                <div class="avatar"><img v-if="data.photos" :src="data.photos[0].photo_name" alt=""></div>
                <div class="content">
                    <div class="in">

                        <div class="paging">
                            <a href="#">Clothing</a>
                            <a href="#">Dresses</a>
                        </div>

                        <h2 class="title">{{data.title_en}}</h2>
                        <div v-html="data.text_en" class="description"></div>
                        <div class="info clearfix">
                            <div class="price">{{data.price}} $</div>
                            <a :href="data.url_en" class="link">{{data.brand}}</a>
                        </div>
                        <div class="likesAndComments">
                            <a href="#">
                                <i class="icon-like"></i>
                                <span>{{data.likes || 0}}</span>
                            </a>
                            <a href="#">
                                <i class="icon-comment"></i>
                                <span>{{ data.comments || 0}}</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            <WrapperCardListTitled title="Similar" url="#" more="false">
                <div v-for="item in data.similar" :key='item.id'  class="mycol-lg-3 mycol-sm-6">
					<ItemCard :item-id="item.id" :image="item.photos[0]['photo_name']" :price="item.price" :title="item.title_en" :url="item.url_en" :brand="item.brand" :likes="item.likes" :is-liked="item.is_liked" :comment="item.comment" />
                </div>
            </WrapperCardListTitled>
        </div>
        <Loading v-if="loading" />
    </div>
</template>

<script>
import WrapperCardListTitled from "@/wrappers/WrapperCardListTitled";
import ItemCard from "@/components/ItemCard";
import Loading from "@/components/Loading";
export default {
  components: {
    WrapperCardListTitled,
    ItemCard,
    Loading
  },
  data() {
    return {
      loading: true
    };
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("get_item", this.$route.params.itemId)
      .then(() => (this.loading = false))
      .catch(() => {
        this.loading = false;
        this.$router.replace({ path: "/404" });
      });
  },
  watch: {
    "$route.params.itemId"(itemId) {
      if (!itemId) return;
      this.loading = true;
      this.$store
        .dispatch("get_item", itemId)
        .then(() => (this.loading = false))
        .catch(() => {
          this.loading = false;
          this.$router.replace({ path: "/404" });
        });
    }
  },
  computed: {
    data() {
      return this.$store.getters.item;
    }
  }
};
</script>


<style scoped>
    .avatar{
        max-height: 600px
    }
</style>
