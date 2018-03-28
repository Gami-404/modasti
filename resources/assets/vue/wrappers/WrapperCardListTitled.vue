<template>
    <div>
        <div class="sectionTitle clearfix">
            <h2 class="theName">{{title}}</h2>
            <a v-if="more != 'false'" :href="url" class="more">More</a>
        </div>

        <div class="secPaddMd">
            <div class="myrow clearfix">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:[ 'title' , 'url' , 'more' ]
}
</script>
