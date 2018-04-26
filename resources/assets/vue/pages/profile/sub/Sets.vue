<template>
	<div class="gridContainer">
		<WrapperCardList>
			<div v-for="set in sets" :key='set' class="mycol-lg-3 mycol-sm-6">
        <SetCard
          :set-id="set"
				/>
			</div>
		</WrapperCardList>
	</div>
</template>

<script>
import SetCard from "@/components/SetCard";
import WrapperCardList from "@/wrappers/WrapperCardList";

export default {
  components: {
    SetCard,
    WrapperCardList
  },
  computed: {
    sets() {
      return this.$store.getters.userSets
    }
  },
  created(){
    let id = isNaN(this.$route.params.userId) ? this.$store.getters.user.userId : userId;
    this.$store.dispatch("get_user_sets",id);
  }
};
</script>

