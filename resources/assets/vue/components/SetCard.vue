<template>
    <div class="productCard">
        <router-link :to="(set.id && '/set/'+set.id)||''">
            <div class="avatar">
                <div class="verticalCentered">
                    <div class="theCell"><img :src="(set['photo']&&set['photo']['photo_name'])||notFoundImg" alt=""></div>
                </div>
            </div>
        </router-link>

        <div class="content">
            <h3>
                <router-link :to="(set.id && '/set/'+set.id)||''">{{set.title_en}}</router-link>
            </h3>
            <hr>
            <div class="createdBy">Created by</div>
            <router-link :to="set['user']&& set['user']['id']?'/profile/'+set['user']['id']:''">{{(set['user']&&set['user']['username'])||'Modasti'}}</router-link>
        </div>

        <CardActions :likebale="true" :is-liked="set.is_liked" :sharable="true" :commentable="true" :num-of-comments="set.comments_counter" :num-of-likes="set.likes" :obj-id="set.id" :context="'set'" />

    </div>
</template>

<script>
import CardActions from "@/components/CardActions";
export default {
  props: [
    "set"
  ],
  components: {
      CardActions
  },
  data(){
      return {
          notFoundImg:"http://www.zusjes.cz/system/show_image.php?src=storage%2FMech%2Fakce-a-terminy%2F%2Flogo3-1510042365.jpg&size=250x450&blank=1"
      }
  }
};
</script>
