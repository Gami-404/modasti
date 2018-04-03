<template>
    <div>
        <SearchNav v-if="!noResults" :search-in="searchIn" />
        <div class="gridContainer">
            <WrapperCardList>
                <div v-if="searchIn == 'item'">
                    <div v-for="item in itemResults" :key='item.id' class="mycol-lg-3 mycol-sm-6">
                        <ItemCard :item-id="item.id" :image="item.photos[0]['photo_name']" :price="item.price" :title="item.title_en" :url="item.url_en" :brand="item.brand" :likes="item.likes" :is-liked="item.is_liked" :comment="item.comment" />
                    </div>
                </div>
                <div v-if="searchIn == 'user'">
                    <UserCard v-for="user of userResults" :key="user.id" :name="user.name" :img="user.img" :date="user.date" :follow="user.follow" />
                </div>
            </WrapperCardList>
            <div v-if="!noResults" class="getMore">
                <a @click.prevent="loadmore" href="#"> {{ loadMoreLoading ? 'Loading' : 'More' }} </a>
            </div>
            <div v-if="noResults" class="searchNoResults">
                <div class="theIcon">
                    <i class="icon-noresults"></i>
                </div>
                <div>No results found</div>
            </div>
        </div>
        <Loading v-if="loading" />
    </div>
</template>

<script>
import Loading from "@/components/Loading";
import SearchNav from "@/components/SearchNav";
import WrapperCardList from "@/wrappers/WrapperCardList";

export default {
  props: ["searchIn"],
  data() {
    return {
      loading: true,
      loadMoreLoading: false
    };
  },
  computed: {
    userResults() {
      return this.$store.getters.userSearchResults;
    },
    itemResults() {
      return this.$store.getters.itemSearchResults;
    },
    noResults() {
      return (
        (this.searchIn == "item" && this.itemResults.length == 0) ||
        (this.searchIn == "user" && this.userResults.length == 0)
      );
    }
  },
  created() {
    this.dispatchSearch();
  },
  watch: {
    // if search string Changed dipatch search
    "$route.params.searchString"(searchString) {
      if (!searchString) return;
      this.dispatchSearch();
      this.resetOffset();
    },
    searchIn(searchIn) {
      if (!searchIn) return;

      this.$store.getters.itemSearchResults.length == 0 ||
      this.$store.getters.userSearchResults.length == 0
        ? this.dispatchSearch()
        : 0;
    }
  },
  methods: {
    // dispatch new serach and overwite old results
    dispatchSearch() {
      this.searchIn == "item"
        ? this.$store
            .dispatch("search_item", this.$route.params.searchString)
            .then(() => (this.loading = false))
            .catch(err => (this.loading = false))
        : this.searchIn == "user"
          ? this.$store
              .dispatch("search_user", this.$route.params.searchString)
              .then(() => (this.loading = false))
              .catch(err => (this.loading = false))
          : this.router.push("/404");
    },
    loadmore() {
      this.loadMoreLoading = true;
      this.searchIn == "item"
        ? this.$store
            .dispatch("search_item_more", this.$route.params.searchString)
            .then(() => (this.loading = false))
            .catch(err => (this.loading = false))
        : this.$store
            .dispatch("search_user_more", this.$route.params.searchString)
            .then(() => (this.loading = false))
            .catch(err => (this.loading = false));
    },
    resetOffset() {
      this.searchIn == "item"
        ? this.$store.dispatch("search_item_offset_reset")
        : this.$store.dispatch("search_user_offset_reset");
    }
  },
  components: {
    SearchNav,
    WrapperCardList,
    Loading
  }
};
</script>
