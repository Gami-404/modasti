<template>
    <div>
        <DetailsNew v-if="contest._type == 'new' " :contest="contest"/>
        <DetailsOld v-else :contest="contest"/>
        <Loading v-if="loading" />
    </div>
</template>
<script>
import DetailsNew from "./DetailsNew";
import DetailsOld from "./DetailsOld";
import Loading from "@/components/Loading";

export default {
  components: {
    DetailsNew,
    DetailsOld,
    Loading
  },
  data () {
      return {
        loading: true      
      }
  },
  computed: {
    contest() {
      return this.$store.getters.contest;
    }
  },
  created() {
    this.$store.dispatch("get_contest_details", this.$route.params.id).then( () =>{
        this.loading = false;
    });
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch("get_contest_details", to.params.id);
    }
  }
};
</script>
