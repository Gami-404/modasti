<template>
    <div class="gridContainer">

        <div class="secPaddMd">
            <div class="myrow clearfix">
                <div v-for="(contest,i) of contests" class="mycol-lg-3 mycol-sm-6" :key="i">
                    <ContestCard
                    :title="contest.title_en"
                    :image="''"
                    :contest-id="contest.id"
                    :joined="contest.is_photo_submitted"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import ContestCard from "@/components/ContestCard";
export default {
    components:{
        ContestCard
    },
    computed: {
        contests(){
            return this.$store.getters.newContests;
        }         
    }
};
</script>