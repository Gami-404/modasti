<template>
    <div class="productCard">
        <div class="avatar">
            <div class="verticalCentered">
                <div class="theCell"><img :src="image" alt=""></div>
            </div>
        </div>

        <div class="content">
            <h3>
                <a href="#">{{title}}</a>
            </h3>
            <hr>
            <div class="createdBy">Created by</div>
            <router-link  :to="username?'/profile/'+userId:''">{{username||'Modasti'}}</router-link>
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
    "setId",
    "title",
    "image",
    "url",
    "likes",
    "comment",
    "username",
    "isLiked",    
    "userId"
  ]
};
</script>
