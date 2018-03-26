<template>
    <div id="category">
        <div class="topCategories whiteBg">
            <div class="gridContainer">
                <a href="#">DRESSES</a>
                <a href="#">SKIRTS</a>
                <a href="#">abayas</a>
                <a href="#">kaftans</a>
                <a href="#">hijabs</a>
                <a href="#">jumpsuits</a>
                <a href="#">tops</a>
                <a href="#">jackets</a>
                <a href="#">coats</a>
                <a href="#">TRENCH COATS</a>
                <a href="#">jeans</a>
                <a href="#">pants</a>
                <a href="#">NIGHTWEARS</a>
                <a href="#">UNDERWEAR</a>
                <a href="#">COSTUMES</a>
                <a href="#">sportswear</a>
            </div>
        </div>
        <div class="gridContainer">
            <ClothingFilter/>
            <WrapperCardList>
                <div v-for="(item,index) in items" :key='index' class="mycol-lg-3 mycol-sm-6">
                    <ItemCard :image="item.image" :price="item.price" :title="item.title" :link="item.link" :like="item.like" :comment="item.comment" />
                </div>
            </WrapperCardList>
        </div>
    </div>
</template>

<script>
import ItemCard from "@/components/ItemCard";
import ClothingFilter from "@/components/ClothingFilter";
import WrapperCardList from "@/wrappers/WrapperCardList";

export default {
  components: {
    ItemCard,
    WrapperCardList,
    ClothingFilter
  },
  computed: {
    items() {
      return this.$store.getters.items;
    }
  },
  created () {
    this.$store.dispatch("items", this.$route.params.name);  
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch("items", to.params.name);
    }
  }
};
</script>
