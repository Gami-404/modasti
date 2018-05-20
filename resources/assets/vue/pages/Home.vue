<template>
	<div id="home">
		<div class="secPaddLg whiteBg textCentered">
			<div class="gridContainer">
				<div class="sectionName">
					<!--<div class="theName">MODEST FASHION FOR ALL</div>-->
					<div class="theImage"><img src="/images/Mockup.jpg" alt="Imges"></div>
					<!--<div class="second">FASHION + INSPIRE + LOVE</div>-->
				</div>
			</div>
		</div>
		<div class="gridContainer">
			<WrapperCardListTitled title="Latest Trends" url="/trending">
				<div v-for="itemId in itemsLatestTrends" :key='itemId' class="mycol-lg-3 mycol-sm-6">
					<ItemCard :item-id="itemId" />
				</div>
			</WrapperCardListTitled>
			<WrapperCardListTitled title="Most Viewed Sets" url="#" more="false">
				<div v-for="set in setsBestFromCommunity" :key="set" class="mycol-lg-3 mycol-sm-6">
					<SetCard :set-id="set" />
				</div>
			</WrapperCardListTitled>
			<WrapperCardListTitled title="Most Liked From Our Community" more="false" url="/trending">
				<div v-for="itemId in itemsMostPopular" :key='itemId' class="mycol-lg-3 mycol-sm-6">
					<ItemCard :item-id="itemId" />
				</div>
			</WrapperCardListTitled>
			<WrapperCardListTitled title="Best From Modasti" more="false" url="/contest">
				<div v-for="itemId in itemsBestFromModasti" :key="set" class="mycol-lg-3 mycol-sm-6">
					<ItemCard :item-id="itemId" />
				</div>
			</WrapperCardListTitled>
			<WrapperCardListTitled title="Official Contests" url="/contest">
				<div v-for="contest in homeContests" :key="contest" class="mycol-lg-3 mycol-sm-6">
					<ContestCard :contest-id="contest" />
				</div>
			</WrapperCardListTitled>
		</div>
		<Loading v-if="loading" />
	</div>
</template>

<script>
import ItemCard from "@/components/ItemCard";
import SetCard from "@/components/SetCard";
import ContestCard from "@/components/ContestCard";
import Loading from "@/components/Loading";
import WrapperCardListTitled from "@/wrappers/WrapperCardListTitled";
import { mapGetters } from "vuex";

export default {
  components: {
    ItemCard,
    SetCard,
    ContestCard,
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
      "itemsLatestTrends",
      "itemsMostPopular",
      "setsBestFromCommunity",
      "itemsBestFromModasti",
      "homeContests"
    ])
  },
  created() {
    this.$store
      .dispatch("get_home_items")
      .then(() => {
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  }
};
</script>
