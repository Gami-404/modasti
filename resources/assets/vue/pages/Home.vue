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
				<div v-for="(item,index) in items_latest_trends" :key='index' class="mycol-lg-3 mycol-sm-6">
					<ItemCard
					:item-id="item.id" 
					:image="item.photos[0]['photo_name']" 
					:price="item.price" 
					:title="item.title_en" 
					:url="item.url_en" 
					:brand="item.brand" 
					:likes="item.likes" 
					:is-liked="item.is_liked" 
					:comment="item.comment" />
				</div>
			</WrapperCardListTitled>

			<WrapperCardListTitled title="Most Liked From Our Community" url="#">
				<div v-for="(item,index) in items_most_popular" :key='index' class="mycol-lg-3 mycol-sm-6">
					<ItemCard
					:item-id="item.id" 					
					:image="item.photos[0]['photo_name']" 
					:price="item.price" 
					:title="item.title_en" 
					:url="item.url_en" 
					:brand="item.brand" 
					:likes="item.likes" 
					:is-liked="item.is_liked" 
					:comment="item.comment" />
				</div>
			</WrapperCardListTitled>

			<WrapperCardListTitled title="Most Viewed Sets" url="#">
				<div v-for="(item,index) in sets_best_from_community" :key="index" class="mycol-lg-3 mycol-sm-6">
					<SetCard 
					:image="item['photo']['photo_name']" 
					:price="item.price" 
					:title="item.title_en" 
					:url="item.url_en" 
					:brand="item.brand" 
					:likes="item.likes" 
					:is-liked="item.is_liked" 
					:comment="item.comment" />
				</div>
			</WrapperCardListTitled>

			<WrapperCardListTitled title="Official Contests" url="#">
				<div v-for="(item,index) in sets_best_from_community" :key="index" class="mycol-lg-3 mycol-sm-6">
					<SetCard 
					:image="item['photo']['photo_name']" 
					:price="item.price" 
					:title="item.title_en" 
					:url="item.url_en"
					:user-id="item['user']['id']"
					:username="item['user']['username']" 
					:likes="item.likes"
					:is-liked="item.is_liked" 
					:comment="item.comments_counter" />
				</div>
			</WrapperCardListTitled>

		</div>
		

	</div>
</template>

<script>
import ItemCard from "@/components/ItemCard";
import SetCard from "@/components/SetCard";
import WrapperCardListTitled from "@/wrappers/WrapperCardListTitled";
import { mapGetters } from "vuex";

export default {
  components: {
    ItemCard,
    SetCard,
    WrapperCardListTitled
  },
  computed: {
    ...mapGetters([
      "items_most_popular",
      "sets_best_from_community",
      "sets_best_from_modasti"
	]),
	items_latest_trends(){
		return this.$store.getters.items_latest_trends.slice(0,8);
	}
  },
  created() {
    this.$store.dispatch("get_home_items");
  }
};
</script>
