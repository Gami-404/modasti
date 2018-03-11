<template>
    <div id="clothing">
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
                <div v-for="(item,index) in products" :key='index' class="mycol-lg-3 mycol-sm-6">
                    <ProductCard :image="item.image" :price="item.price" :title="item.title" :link="item.link" :like="item.like" :comment="item.comment" />
                </div>
            </WrapperCardList>
        </div>
    </div>
</template>

<script>
import ProductCard from "../components/ProductCard";
import ClothingFilter from "../components/ClothingFilter";
import WrapperCardList from "../components/wrappers/WrapperCardList";

export default {
  components: {
    ProductCard,
    WrapperCardList,
    ClothingFilter
  },
  computed: {
    products() {
      let arr = [];
      const products = [
        {
          url: "",
          title: "VELVET PUMPS WITH BEJEWELED HEELS",
          image: "images/4.jpg",
          price: 520,
          url: "",
          like: 10,
          comment: 10,
          link: "dolcegabbana.com",
          by: "Modasti retail - Modasti"
        },
        {
          url: "",
          title: "VELVET PUMPS WITH BEJEWELED HEELS",
          image: "images/3.jpg",
          price: 320,
          url: "",
          like: 20,
          comment: 11,
          link: "dolcegabbana.com",
          by: "Modasti retail - Modasti"
        },
        {
          url: "",
          title: "VELVET PUMPS WITH BEJEWELED HEELS",
          image: "images/1.jpg",
          price: 120,
          url: "",
          like: 5,
          comment: 2,
          link: "dolcegabbana.com",
          by: "Modasti retail - Modasti"
        }
      ];

      for (let i = 0; i < 8; i++) {
        arr.push(products[Math.floor(Math.random() * 3)]);
      }
      return arr;
    }
  }
};
</script>
