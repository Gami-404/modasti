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
							<div v-for="(error,i) in errors" :key="i">
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
								<router-link to="?popup=signup">Sign Up</router-link>
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
			loading: false,
			errors:[]
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
        .then(res => {
          if (res.errors.length == 0) this.$router.push("/");
					else this.errors = res.errors;	
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  computed: {
    isLoading() {
      return this.loading ? "Loading.." : "login";
    },
    errors() {
      return this.errors;
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


