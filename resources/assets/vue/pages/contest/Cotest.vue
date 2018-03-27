<template>
	<div>
		<div class="secPaddLg whiteBg">
			<div class="gridContainer">
				<div class="sectionName">
					<div class="theName">CONTESTS</div>
					<div class="second">JOIN A CONTEST AND WIN FANTASTIC DISCOUNTS!</div>
				</div>
			</div>
		</div>
		<div class="contestTop whiteBg">
			<div class="gridContainer clearfix">
				<router-link active-class="active-header"  exact to="new">New Contest</router-link>
				<router-link active-class="active-header"  exact to="old">Old Contest</router-link>
			</div>
		</div>
		<div class="gridContainer">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {
  created(){
	  this.$store.dispatch('get_all_contests');
  }
}
</script>
