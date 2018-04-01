<template>
    <div class="productCard">
        <div class="avatar">
            <div class="verticalCentered">
                <div class="theCell"><img :src="image|| 'https://s-media-cache-ak0.pinimg.com/originals/b3/ee/a8/b3eea8d4b3727ce12a5392c3194c285f.jpg'" alt=""></div>
            </div>
        </div>

        <div class="content">
            <h3>
                <router-link :to="'/contest/'+contestId">{{title}}</router-link>
            </h3>
            <hr>
            <router-link v-if="!joined && !isOld" :to="'?popup=join&contestId=' + contestId" class="mainBtn">Join Contest</router-link>
            <router-link v-else-if="isOld" class="mainBtn" :to="'/contest/'+contestId" > Check Winner </router-link>
            <router-link v-else class="mainBtn" :to="'/contest/'+contestId" > View </router-link>
        </div>
        <div class="likesAndComments">
            <a href="#">
                <i class="fa fa-heart" v-if="isLiked" ></i>
                <i class="fa fa-heart-o" v-if="!isLiked" ></i>
                <span>{{likes || 0}}</span>
            </a>
            <a href="#">
                <i class="icon-comment"></i>
                <span>{{comment || 0}}</span>
            </a>
        </div>
    </div>
</template>
<script>
export default {
  props: ["contestId", "image" , "title" , "joined", "isOld"]
};
</script>
