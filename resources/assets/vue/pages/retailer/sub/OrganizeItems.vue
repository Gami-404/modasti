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
								<td>{{item.brand.name}}</td>
								<td>{{item.content}}</td>
								<td>{{item.category}}</td>
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
import Loading from '@/components/Loading';
export default {
	components:{
		Loading
	},
	data(){
		return { loading: true }
	},
  computed: {
    items() {
      return this.$store.getters.retailerItems;
    }
  },
  created() {
    this.getItems();
    Promise.all([
      this.$store.dispatch("get_categories"),
      this.$store.dispatch("get_all_items")
    ]).then( () => this.loading = false );
  },
  methods: {
    getItems() {
      this.$store.dispatch("get_all_items");
    },
    deleteItem(id) {
      this.$refs[id].innerHTML = "...";
      this.dispatch("delete_item", id)
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
