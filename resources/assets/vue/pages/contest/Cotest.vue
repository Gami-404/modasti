<template>
	<div>
		<div v-if="isTab" class="secPaddLg whiteBg">
			<div class="gridContainer">
				<div class="sectionName">
					<div class="theName">CONTESTS</div>
					<div class="second">JOIN A CONTEST AND WIN FANTASTIC DISCOUNTS!</div>
				</div>
			</div>
		</div>
		<div class="contestTop whiteBg">
			<div class="gridContainer clearfix">
				<router-link active-class="active-header"  exact to="new">New Contests</router-link>
				<router-link active-class="active-header"  exact to="old">Old Contests</router-link>
			</div>
		</div>
		<div class="gridContainer">
        <transition name="paget" enter-active-class="animated fadeIn">
			<router-view />
        </transition>
		</div>
	</div>
</template>

<script>
export default {
  created(){
	  this.$store.dispatch('get_all_contests');
  },
  computed:{
	  isTab(){
		  //BPCT
		  return this.$route.path == '/contest/new' || this.$route.path == '/contest/old';
	  }
  }
}
</script>
