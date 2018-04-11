<template>
		<div class="gridContainer">
			<WrapperCardListTitled  title="Liked Items" url="#">
				<div v-for="item in likedItems" :key='item' class="mycol-lg-3 mycol-sm-6">
					<ItemCard :item-id="item" />					
				</div>
			</WrapperCardListTitled>

			<WrapperCardListTitled title="Liked Sets" url="#">
				<div v-for="set in likedSets" :key="set" class="mycol-lg-3 mycol-sm-6">
					<SetCard :set-id="set" />
				</div>
			</WrapperCardListTitled>

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
      "likedItems",
      "likedSets",
      "likedCollections"
    ])
  },
  created() {
    let id = typeof this.$route.params.userId == "number" ? this.$route.params.userId : this.$store.getters.user.userId;
    Promise.all([
      this.$store.dispatch("get_user_liked_items",id),
     this.$store.dispatch("get_user_liked_sets",id),
    //  this.$store.dispatch("get_user_liked_collections",id)
    ]).finally( () =>{
      this.loading = false;
    });
     
  }
};
</script>
