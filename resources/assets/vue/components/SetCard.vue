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

        <CardActions :sharable="true" :commentable="true" :num-of-likes="likes" :likebale="true" :is-liked="isLiked" :obj-id="setId" :context="'set'" />

    </div>
</template>

<script>
import CardActions from "@/components/CardActions";
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
  ],
  components: {
      CardActions
  }
};
</script>
