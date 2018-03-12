<template>
	<div class="popupPage">
		<div class="verticalCentered">
			<div class="theCell">
				<router-link to="?popup="><div class="outerClose"></div></router-link>
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
						<div class="theForm">
							<input type="text" class="formEle" placeholder="Email">
							<input type="password" class="formEle" placeholder="Password">
							<input type="submit" @click="login" class="formEle btn" value="login">
						</div>

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
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: "yoyoa96@hotmail.it",
        password: "123456"
      });
    }
  }
};
</script>

