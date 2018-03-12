<template>
	<div class="popupPage">
		<div class="verticalCentered">
			<div class="theCell">

				<router-link to="?popup=">
					<div class="outerClose"></div>
				</router-link>
				<div class="thePage">
					<div class="head">
						<span>Forget Password</span>
						<router-link class="head" to="?popup=">
							<span class="icon">
								<i class="fa fa-close"></i>
							</span>
						</router-link>
					</div>
					<div class="content">
						<form @submit="send" class="theForm">
							<input type="email" class="formEle" placeholder="Email" v-model="email" required>
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
</template>


<script>
export default {
  data() {
    return {
      email: "",
      loading: false,
      errors: []
    };
  },
  methods: {
    send(e) {
	  e.preventDefault();
	  this.errors = ['no API'];
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
