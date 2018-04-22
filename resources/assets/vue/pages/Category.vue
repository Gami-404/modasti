<template>
  <div id="category">
    <div class="topCategories whiteBg">
      <div v-if="category" class="gridContainer">
        <a v-for="sub of category.subcategories" :key="sub.id" @click.prevent="selectSub(sub.id)" href="#" :class="{  'curr' : sub.id == subId }">{{sub.title}}</a>
      </div>
    </div>
    <div class="gridContainer">
      <ClothingFilter/>
      <WrapperCardList v-if="category">
        <div v-for="item in categoryFiltered" :key='item' class="mycol-lg-3 mycol-sm-6">
          <ItemCard :item-id="item" />
        </div>
      </WrapperCardList>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import ItemCard from "@/components/ItemCard";
import ClothingFilter from "@/components/ClothingFilter";
import Loading from "@/components/Loading";
import WrapperCardList from "@/wrappers/WrapperCardList";
import { mapGetters } from "vuex";

export default {
  components: {
    ItemCard,
    WrapperCardList,
    ClothingFilter,
    Loading
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapGetters(["categoryFiltered", "category", "categoryItems"]),
    subId() {
      return this.$store.getters.filters.sub;
    }
  },
  created() {
    this.$store.dispatch("get_categories").then(() => {
      this.$store
        .dispatch("get_category_items", this.$route.params.name)
        .then(() => {
          Promise.all([
            this.$store.dispatch("get_colors"),
            this.$store.dispatch("get_brands"),
            this.$store.dispatch("get_sizes")
          ]).then(() => (this.loading = false));
        })
        .catch(err => {
          this.$router.push("/404");
          console.error(err);
        });
    });
  },
  watch: {
    "$route.params.name"(name) {
      if (!name) return;
      this.loading = true;
      this.$store
        .dispatch("get_category_items", this.$route.params.name)
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          this.$router.push("/404");
          console.error(err);
        });
    }
  },
  methods: {
    selectSub(id) {
      this.$store.commit("CHANGE_FILTER_SUB", id);
    }
  }
};
</script>

<style scoped>
.curr {
  color: red;
}
</style>