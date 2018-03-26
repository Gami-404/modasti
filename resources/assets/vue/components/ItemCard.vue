<template>
    <div class="productCard">
        <div class="avatar">
            <div class="verticalCentered">
                <div class="theCell"><img :src="image" alt=""></div>
            </div>
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
        <div class="likesAndComments">
            <a href="#">
                <i class="fa fa-heart" v-if="isLiked" ></i>
                <i class="fa fa-heart-o" v-if="!isLiked" ></i>
                <span>{{likes}}</span>
            </a>
            <a href="#">
                <i class="icon-comment"></i>
                <span>{{comment}}</span>
            </a>
        </div>
    </div>
</template>

<script>
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
  ]
};
</script>
