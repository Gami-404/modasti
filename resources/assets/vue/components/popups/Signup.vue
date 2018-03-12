<template>
	<div class="popupPage">
		<div class="verticalCentered">
			<div class="theCell">
				<router-link to="?popup=">
					<div class="outerClose"></div>
				</router-link>
				<div class="thePage">
					<div class="head">
						<span>SignUp</span>
						<router-link class="head" to="?popup=">
							<span class="icon">
								<i class="fa fa-close"></i>
							</span>
						</router-link>
					</div>
					<div class="content">
						<form @submit="signUp" class="theForm">
							<input type="text" class="formEle" placeholder="Full Name" v-model="name" required>
							<input type="email" class="formEle" placeholder="Email" v-model="email" required>
							<input type="password" class="formEle" placeholder="Password" v-model="password" required>
							<input type="password" class="formEle" placeholder="Repeat Password" v-model="password2" required>
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
			</div>

		</div>
	</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
      loading: false,
      errors: []
    };
  },
  methods: {
    signUp(e) {
      e.preventDefault();
      this.loading = true;
      if (this.password == this.password2) {
        this.$store
          .dispatch("register", {
            email: this.email,
            password: this.password,
            name: this.name
          })
          .then(res => {
			if (res.errors.length == 0) this.$router.push("/");
			else this.errors = res.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$store.commit("errors", ["Passwords not matching"]);
        this.loading = false;
      }
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