<template>
    <div class="itemCard">
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
            <div class="price">{{price}} €</div>
            <div class="link">
                <a href="#">{{link}}</a>
            </div>
        </div>
        <div class="likesAndComments">
            <a href="#">
                <i class="icon-like"></i>
                <span>{{like}}</span>
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
  props:['title', 'image', 'url','link' ,'price', 'like', 'comment']
}
</script>
