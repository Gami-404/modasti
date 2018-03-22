<template>
  <div class="gridContainer">
		<div class="followersPage secPaddLg">
			<div class="myrow clearfix">
				<UserCard
                    v-for="user of users"
                    :key="user.id"
                    :name="user.name"
                    :img="user.img"
                    :date="user.date"
                    :follow="user.follow"
                />				
				
			</div>
		</div>
	</div>
</template>

<script>
import UserCard from '../UserCard';
export default {
  components: {
    UserCard
  },
}
</script>

