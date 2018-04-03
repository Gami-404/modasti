<template>
    <div class="gridContainer">
        <SearchNav :search-in="$route.params.searchIn" />
        <WrapperCardList>
            <div v-if="$route.params.searchIn == 'item'">
                <div v-for="item in itemResults" :key='item.id' class="mycol-lg-3 mycol-sm-6">
                    <ItemCard :item-id="item.id" :image="item.photos[0]['photo_name']" :price="item.price" :title="item.title_en" :url="item.url_en" :brand="item.brand" :likes="item.likes" :is-liked="item.is_liked" :comment="item.comment" />
                </div>
            </div>
            <div v-if="$route.params.searchIn == 'user'">
                <UserCard v-for="user of userResults" :key="user.id" :name="user.name" :img="user.img" :date="user.date" :follow="user.follow" />
            </div>
        </WrapperCardList>
        <div class="getMore">
            <a @click.prevent="loadmore" href="#"> {{ loadMoreLoading ? 'Loading' : 'More' }} </a>
        </div>
    </div>
</template>

<script>
import SearchNav from "@/components/SearchNav";
import WrapperCardList from "@/wrappers/WrapperCardList";

export default {
  data() {
    return {
      loading: ture,
      loadMoreLoading: false
    };
  },
  computed: {
    userResults() {
      return this.$state.getters.userSearchResults;
    },
    itemResults() {
      return this.$state.getters.itemSearchResults;
    }
  },
  created() {
    this.dispatchSearch();
  },
  watch: {
    // if seach string Changed dipatch search
    "$route.params.searchString"(searchString) {
      if (!searchString) return;
      this.dispatchSearch();
      this.resetOffset();
    },
    // if seach context changed and there is an empty results array dispatch
    "$route.params.searchIn"(searchIn) {
      if (!searchIn) return;
      if (
        this.$store.getters.itemSearchResults.length == 0 ||
        this.$store.getters.userSearchResults.length == 0
      )
        this.dispatchSearch();
    }
  },
  methods: {
    // dispatch new serach and overwite old results
    dispatchSearch() {
      this.$route.params.searchIn == "item"
        ? this.$store
            .dispatch("search_item", this.params.seachString)
            .then(() => (this.loading = false))
        : this.$route.params.searchIn == "user"
          ? this.$store
              .dispatch("search_user", this.params.seachString)
              .then(() => (this.loading = false))
          : this.router.push("/404");
    },
    loadmore() {
      this.loadMoreLoading = true;
      this.$route.params.searchIn == "item"
        ? this.$store
            .dispatch("search_item_more", this.params.seachString)
            .then(() => (this.loadMoreLoading = false))
        : this.$store
            .dispatch("search_user_more", this.params.seachString)
            .then(() => (this.loadMoreLoading = false));
    },
    resetOffset() {
      this.$route.params.searchIn == "item"
        ? this.$store.dispatch("search_item_offset_reset")
        : this.$store.dispatch("search_user_offset_reset");
    }
  },
  components: {
    SearchNav,
    WrapperCardList
  }
};
</script>
