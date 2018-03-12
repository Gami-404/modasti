<template>
    <div class="mycol-lg-3 mycol-md-4 mycol-sm-6">
        <div class="userCard textCentered">
            <div class="avatar"><img :src="img" alt=""></div>
            <div class="name">{{name}}</div>
            <div class="joined">{{date}}</div>
            <a href="#" class="followBtn" :class="{ follow :'follow' }" >{{follow ? 'follow':'unfollow'}}</a>
        </div>
    </div>
</template>

<script>
 
export default {
    props:['img','name','date','follow']
}
</script>

