<template>
    <div class="ItemCard">
        <div class="avatar">
            <div class="verticalCentered">
                <div class="theCell"><img :src="image" alt=""></div></div>
            </div>
        
        <div class="content">
            <h3><a href="#">{{title}}</a></h3>
            <hr>
            <div class="createdBy">Created by</div>
            <div>{{by}}</div>
        </div>
        <div class="likesAndComments">
            <a href="#"><i class="icon-like"></i><span>{{like}}</span></a>
            <a href="#"><i class="icon-comment"></i><span>{{comment}}</span></a>
        </div>
	</div>
</template>

<script>
export default {
  props:['title', 'image', 'url', 'like', 'comment' , 'by']
}
</script>
