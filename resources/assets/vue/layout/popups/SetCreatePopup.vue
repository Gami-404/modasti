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
        <form @submit.prevent="addSet" class="theForm">
          <input type="test" class="formEle" placeholder="Set title" v-model="set.title" required>
          <input type="text" class="formEle" placeholder="Description" v-model="set.description" required>
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
  props:["base64Img","items"],
  data() {
    return {
      set:{
        title:"",
        description:"",
        data:"",
        items:this.items,
        image:this.base64Img
      },
      loading: false,
      errors: []
    };
  },
  methods: {
    addSet() {
      this.loading = true;
      this.$store
        .dispatch("add_set", this.set)
        .then(errors => {
          if (errors.length == 0) this.$router.push({ path: "/profile/me/sets" , query: {} });
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