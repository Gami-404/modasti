<template>
  <div id="profilenav">
	<ProfileHeader/>
	<div class="categoriesTop whiteBg">
		<div class="gridContainer clearfix">
			<router-link to="items">Items</router-link>
			<router-link to="sets">Sets</router-link>
			<router-link to="collections">Collections</router-link>
			<router-link to="likes">Likes</router-link>
			<router-link to="following">Following</router-link>
			<router-link to="followers">Followers</router-link>
			<router-link to="groups">Groups</router-link>
			<router-link to="wins">Wins</router-link>
			<router-link to="blocked"> Blocked users </router-link>
		</div>
	</div>
  </div>
</template>
<script>
import ProfileHeader from "./ProfileHeader";
export default {
	components: {
		ProfileHeader
	}
}
</script>
