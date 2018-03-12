<template>
	<div class="popupPage">
		<div class="verticalCentered">
			<div class="theCell">
				<router-link to="?popup=">
					<div class="outerClose"></div>
				</router-link>
				<div class="thePage">
					<div class="head">
						<span>Login</span>
						<router-link class="head" to="?popup=">
							<span class="icon">
								<i class="fa fa-close"></i>
							</span>
						</router-link>
					</div>
					<div class="content">
						<form @submit="login" class="theForm">
							<input type="email" class="formEle" placeholder="Email" v-model="email" required>
							<input type="password" class="formEle" placeholder="Password" v-model="password" required>
							<input type="submit" :disabled="loading" class="formEle btn" :value="isLoading">
						</form>
						<div class="otherLinks">
							<div class="one">Forgot Password?
								<a href="#">Get New</a>
							</div>
							<div class="one">Not Registered?
								<a href="#">Sign Up</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false
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
        }).then(()=>{
			this.$router.push('/');	
		}).finally( ()=>{
			this.loading = false;
		});
    }
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
</style>


