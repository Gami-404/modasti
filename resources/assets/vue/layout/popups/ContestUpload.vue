<template>
  <transition name="popups" enter-active-class="animated bounceIn">
    <div>
      <div class="head">
        <span>login</span>
        <router-link class="head" to="?popup=">
          <span class="icon">
            <i class="fa fa-close"></i>
          </span>
        </router-link>
      </div>
      <div class="content">
        <form @submit.prevent="login" class="theForm">
          <input type="email" class="formEle" placeholder="Email" v-model="email" required>
          <div class="mrgBtmMd fontLarger">Image</div>
						<label for="uploadImg" class="inputEle brandBg vCenter textCentered mrgBtmLg"> Upload Image </label>
						<input type="file" id="uploadImg" class="disNone" @change="processFile($event)">
						<div class="uploadedPhotoDisplay mrgBtmLg">
							<span v-if="form.image === ''" class="fontLarger grayColor hideAfterUpload">No photo</span>
							<img :src="form.image" alt="">
						</div>
          <input type="password" class="formEle" placeholder="Password" v-model="password" required>
          <div v-for="error in errors" :key="error">
            <h4 class="errors">
              {{error}}
            </h4>
            <br/>
          </div>
          <input type="submit" :disabled="loading" class="formEle btn" :value="isLoading">
        </form>
        <div class="otherLinks">
          <div class="one">Forgot Password?
            <router-link to="?popup=forget">Get New</router-link>
          </div>
          <div class="one">Not Registered?
            <router-link :to="'?popup=signup&redirect='+$route.query.redirect">Sign Up</router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      from:{
        image:"",
      },
      success:false,
      loading: false,
      errors: []
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("join_contest", this.from)
        .then(res => {
         this.success = true;
         this.loading = false;
        })
        .catch( err => {
          this.errors = err.response.data.errors;
          this.loading = false;
        });
    },
    processFile(e) {
      let input = e.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.form.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
  computed: {
    isLoading() {
      return this.loading ? "Loading.." : "login";
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