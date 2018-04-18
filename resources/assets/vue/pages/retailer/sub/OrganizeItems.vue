<template>
	<div class="organizeItemsPage">
		<div class="gridContainer">
			<div class="myTable">
				<div class="tableContainer">
					<table>
						<tbody>
							<tr>
								<th>&nbsp;</th>
								<th>Status</th>
								<th>Name</th>
								<th>brand</th>
								<th>description</th>
								<th>category</th>
								<th>shop</th>
							</tr>
							<tr v-for="item in items" :key="item.id">
								<td>
									<div class="mrgBtmSm">
										<router-link :to="'edit/'+item.id" class="brandColor">Edit</router-link>
									</div>
									<div>
										<a href="#" :ref="item.id" @click.prevent="deleteItem(item.id)" class="brandColor">delete</a>
									</div>
								</td>
								<td>{{item.status?'Confirmed':'Pending'}}</td>
								<td>{{item.title}}</td>
								<td>{{item.brand.title}}</td>
								<td>{{item.content}}</td>
								<td>{{item.categories[0].name}}</td>
								<td>
									<a :href="item.url">URL</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<Loading v-if="loading" />
	</div>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  components: {
    Loading
  },
  data() {
    return { loading: true };
  },
  computed: {
    items() {
      return this.$store.getters.retailerItems;
    }
  },
  created() {
    this.$store.dispatch("get_all_items").then(() => (this.loading = false));
  },
  methods: {
    deleteItem(id) {
      this.$refs[id].innerHTML = "...";
      this.$store
        .dispatch("delete_item", id)
        .then(() => {
          if (this.$refs[id]) this.$refs[id].innerHTML = "Deleted";
        })
        .catch(err => {
          console.error(err);
          this.$router.puch("/500");
        });
    }
  }
};
</script>

<style>

</style>
