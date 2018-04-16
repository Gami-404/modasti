<template>
  <div>
    <iframe src="http://127.0.0.1:8000/api/designer-register" frameborder="0"></iframe>
    <div v-html="htmlPage" class="from-server" />
    <Loading v-if="loading" />
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import axios from "axios";
export default {
  components: {
    Loading
  },
  data() {
    return {
      htmlPage: "",
      loading: true
    };
  },
  created() {
    axios
      .get("http://127.0.0.1:8000/api/" + this.$route.params.path, {
        headers: { Authorization: `Bearer ${this.$store.getters.api_token}` }
      })
      .then(res => {
        this.htmlPage = res.data;
        this.loading = false;
      });
  },
  watch: {
    "this.$route.params.path"(path) {
      this.loading = true;
      axios
        .get("http://127.0.0.1:8000/" + path, {
          headers: { Authorization: `Bearer ${this.$store.getters.api_token}` }
        })
        .then(res => {
          this.htmlPage = res.data;
          this.loading = false;
        });
    }
  }
};
</script>

