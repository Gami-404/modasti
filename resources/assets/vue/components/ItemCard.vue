<template>
    <div class="productCard">
        <div class="avatar">
            <router-link :to="itemId?'/item/'+itemId : ''" class="verticalCentered">
                <div class="theCell"><img :src="image" alt=""></div>
            </router-link>
        </div>

        <div class="content">
            <h3>
                <router-link :to="itemId?'/item/'+itemId : ''">{{title}}</router-link>
            </h3>
            <hr>
            <div class="price">{{price}} €</div>
            <div class="link">
                <a :href="url">{{brand||"Unknown"}}</a>
            </div>
        </div>
        <CardActions :sharable="true" :likebale="true" :is-liked="isLiked" :obj-id="itemId" :context="'item'" />
    </div>
</template>

<script>
import CardActions from "./CardActions";
export default {
  props: [
    "itemId",
    "title",
    "image",
    "url",
    "brand",
    "price",
    "likes",
    "isLiked",
    "comment"
  ],
  components: {
    CardActions
  }
};
</script>
