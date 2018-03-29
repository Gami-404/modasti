<template>
  <transition name="popups" enter-active-class="animated bounceIn">
    <div>
      <div class="head">
        <span>New Set</span>
        <router-link class="head" to="?popup=">
          <span class="icon">
            <i class="fa fa-close"></i>
          </span>
        </router-link>
      </div>
      <div class="content">
        <form @submit="login" class="theForm">
          <input type="test" class="formEle" placeholder="Set name" v-model="name" required>
          <input type="text" class="formEle" placeholder="Details" v-model="details" required>
          <div v-for="(error,i) in errors" :key="i">
            <h4 class="errors">
              {{error}}
            </h4>
            <br/>
          </div>
          <input type="submit" :disabled="loading" class="formEle btn" :value="isLoading">
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      details: "",
      loading: false,
      errors: []
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.loading = true;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(errors => {
          if (errors.length == 0) this.$router.push({ path: this.$route.query.redirect , query: {} });
          else this.errors = errors;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  computed: {
    isLoading() {
      return this.loading ? "Loading.." : "Publish";
    }
  }
};
</script>


<style scoped>
input:invalid {
  background-color: #fff;
}
.errors {
  font-family: "Cheque-Black";
  color: RED;
}
</style>