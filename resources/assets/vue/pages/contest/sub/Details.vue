<template>
  <div>
    <component :is="theComponent" :contest="contest"></component>
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
  data() {
    return {
      loading: true,
      theComponent: null
    };
  },
  computed: {
    contest() {
      return this.$store.getters.contest(this.$route.params.contId);
    }
  },
  created() {
    this.$store
      .dispatch("get_contest_details", this.$route.params.contId)
      .then(() => {
        if (
          this.$store.getters.contest(this.$route.params.contId)._type == "new"
        ) {
          this.theComponent = DetailsNew;
        } else if (
          this.$store.getters.contest(this.$route.params.contId)._type == "old"
        ) {
          this.theComponent = DetailsOld;
        }
        this.loading = false;
      });
  },
  watch: {
    "$route.params.contId"(contId) {
      if (!contId) return;
      this.loading = true;
      this.$store.dispatch("get_contest_details", contId).then(() => {
        this.loading = false;
      });
    }
  }
};
</script>
