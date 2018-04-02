<template>
  <div id="category">
    <div class="topCategories whiteBg">
      <div v-if="category" class="gridContainer">
        <a v-for="sub of category.subcategories" :key="sub.id" href="#">{{sub.title}}</a>
      </div>
    </div>
    <div class="gridContainer">
      <ClothingFilter/>
      <WrapperCardList v-if="category">
        <div v-for="item in items" :key='item.id' v-if="item.photos[0]" class="mycol-lg-3 mycol-sm-6">
          <ItemCard :item-id="item.id" :image="item.photos[0]['photo_name']" :price="item.price" :title="item.title_en" :url="item.url_en" :brand="item.brand" :likes="item.likes" :is-liked="item.is_liked" :comment="item.comment" />
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

export default {
  components: {
    ItemCard,
    WrapperCardList,
    ClothingFilter,
    Loading
  },
  data() {
    return {
      loading: true,
      FilterColor: [],
      FilterPrice: [],
      FilterSize: [],
      FilterBrand: ["SEPHORA COLLECTION"]
    };
  },
  computed: {
    category() {
      return this.$store.getters.category;
    },
    items() {
      return this.$store.getters.category.items
        ? this.$store.getters.category.items
            .filter(item => 
              this.FilterBrand.indexOf(item.brand) != -1 || this.FilterBrand.length == 0
            ).filter(item => 
              this.FilterColor.indexOf(item.color) != -1 || this.FilterColor.length == 0) 
        : [];
    }
  },
  created() {
    this.$store.dispatch("get_categories").then(() => {
      this.$store
        .dispatch("get_category_items", this.$route.params.name)
        .then(() => {
          this.loading = false;
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
        });
    }
  }
};
</script>
