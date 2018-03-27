<template>
    
</template>
<script>
import DetailsNew from "./DetailsNew";
import DetailsOld from "./DetailsOld";
export default {
  components:{
      DetailsNew,
      DetailsOld
  },
  created () {
      this.$store.dispatch("get_contest_details");
  }
}
</script>
