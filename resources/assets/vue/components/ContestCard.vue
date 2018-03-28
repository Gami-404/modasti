<template>
    <div class="productCard">
        <div class="avatar">
            <div class="verticalCentered">
                <div class="theCell"><img :src="image" alt=""></div>
            </div>
        </div>

        <div class="content">
            <h3>
                <router-link :to="'/contest/'+contestId">{{title}}</router-link>
            </h3>
            <hr>
            <router-link v-if="!joined" :to="'?popup=join&contestId=' + contestId" class="mainBtn">Join Contest</router-link>
        </div>
    </div>
</template>
<script>
export default {
  props: ["contestId", "image" , "title" , "joined"]
};
</script>
