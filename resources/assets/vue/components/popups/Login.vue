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
							<input type="submit" :disabled="$store.getters.authLoading" class="formEle btn" :value="loading">
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
      password: ""
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  },
  computed: {
    loading() {
      return this.$store.getters.authLoading ? "Loading.." : "login";
    }
  }
};
</script>


<style scoped>
input:invalid {
  background-color: #fff;
}
</style>


