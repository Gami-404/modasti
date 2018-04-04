<template>
    <div class="productCard">
        <div class="avatar">
            <router-link :to="item.id?'/item/'+item.id : ''" class="verticalCentered">
                <div class="theCell"><img :src="item['photos'][0]['photo_name']" alt=""></div>
            </router-link>
        </div>

        <div class="content">
            <h3>
                <router-link :to="item.id?'/item/'+item.id : ''">{{item.title}}</router-link>
            </h3>
            <hr>
            <div class="price">{{item.price}} €</div>
            <div class="link">
                <a :href="item.url_en">{{item.brand||"Unknown"}}</a>
            </div>
        </div>
        <CardActions :sharable="true" :num-of-likes="item.likes||item.likes_counter" :likebale="true" :is-liked="item.is_liked" :obj-id="item.id" :context="'item'" />
    </div>
</template>

<script>
import CardActions from "./CardActions";
export default {
  props: ["item"],
  components: {
    CardActions
  }
};
</script>
