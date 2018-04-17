<template>
  <div class="businessFormHeader whiteBg">
		<div class="gridContainer">
			<div class="tabs">
				<router-link to="allitems" active-class="active-retailer-nav">All items</router-link>
				<router-link to="new" active-class="active-retailer-nav">Add new item</router-link>
				<router-link to="import" active-class="active-retailer-nav">Import items</router-link>
				<router-link to="help" active-class="active-retailer-nav">Help?</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style>
.active-retailer-nav{
  color: #ffbeb8;
}
</style>
