<template>
	<div class="gridContainer">
		<WrapperCardList>
			<div v-for="(item,index) in products" :key='index' class="mycol-lg-3 mycol-sm-6">
				<ProductCard :image="item.image" :price="item.price" :title="item.title" :link="item.link" :like="item.like" :comment="item.comment" />
			</div>
		</WrapperCardList>
	</div>
</template>

<script>
import Nav from "./Nav";
import ProductCard from "../ProductCard";
import WrapperCardList from "../wrappers/WrapperCardList";

export default {
  components: {
    ProductCard,
    WrapperCardList
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

