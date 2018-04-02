<template>
	<div id="home">
		<div class="secPaddLg whiteBg textCentered">
			<div class="gridContainer">
				<div class="sectionName">
					<div class="theName">MODEST FASHION FOR ALL</div>
					<div class="second">FASHION + INSPIRE + LOVE</div>
				</div>
			</div>
		</div>

		<div class="gridContainer">

			<WrapperCardListTitled title="Latest Trends" url="#">
				<div v-for="item in itemsLatestTrends" :key='item.id' class="mycol-lg-3 mycol-sm-6">
					<ItemCard :item-id="item.id" :image="item.photos[0]['photo_name']" :price="item.price" :title="item.title_en" :url="item.url_en" :brand="item.brand" :likes="item.likes" :is-liked="item.is_liked" :comment="item.comment" />
				</div>
			</WrapperCardListTitled>

			<WrapperCardListTitled title="Most Liked From Our Community" url="#">
				<div v-for="item in itemsMostPopular" :key='item.id' class="mycol-lg-3 mycol-sm-6">
					<ItemCard :item-id="item.id" :image="item.photos[0]['photo_name']" :price="item.price" :title="item.title_en" :url="item.url_en" :brand="item.brand" :likes="item.likes" :is-liked="item.is_liked" :comment="item.comment" />
				</div>
			</WrapperCardListTitled>

			<WrapperCardListTitled title="Most Viewed Sets" url="#">
				<div v-for="item in setsBestFromCommunity" :key="item.id" class="mycol-lg-3 mycol-sm-6">
					<SetCard :set-id="item.id" :image="item['photo']['photo_name']" :price="item.price" :title="item.title_en" :url="item.url_en" :user-id="item['user']['id']" :username="item['user']['username']" :brand="item.brand" :likes="item.likes" :is-liked="item.is_liked" :comment="item.comment" />
				</div>
			</WrapperCardListTitled>

			<WrapperCardListTitled title="Official Contests" url="#">
				<div v-for="item in setsBestFromCommunity" :key="item.id" class="mycol-lg-3 mycol-sm-6">
					<SetCard :set-id="item.id" :image="item['photo']['photo_name']" :price="item.price" :title="item.title_en" :url="item.url_en" :user-id="item['user']['id']" :username="item['user']['username']" :likes="item.likes" :is-liked="item.is_liked" :comment="item.comments_counter" />
				</div>
			</WrapperCardListTitled>

		</div>

		<Loading v-if="loading" />
	</div>
</template>

<script>
import ItemCard from "@/components/ItemCard";
import SetCard from "@/components/SetCard";
import Loading from "@/components/Loading";
import WrapperCardListTitled from "@/wrappers/WrapperCardListTitled";
import { mapGetters } from "vuex";

export default {
  components: {
    ItemCard,
    SetCard,
    Loading,
    WrapperCardListTitled
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapGetters([
      "itemsMostPopular",
      "setsBestFromCommunity",
      "setsBestFromModasti"
    ]),
    itemsLatestTrends() {
      return this.$store.getters.itemsLatestTrends.slice(0, 8);
    }
  },
  created() {
    this.$store.dispatch("get_home_items").then( () => {
			this.loading = false;
		}).catch( err =>{
			this.loading = false;
		});
  }
};
</script>
