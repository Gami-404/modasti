<template>
	<transition name="popups" enter-active-class="animated bounceIn">
		<div>
			<div class="head">
				<span>Report</span>
				<router-link class="head" to="?popup=">
					<span class="icon">
						<i class="fa fa-close"></i>
					</span>
				</router-link>
			</div>
			<div class="content">
				<form @submit="send" class="theForm" v-if="!upload">
					<input type="text" class="formEle" placeholder="Enter you report title " v-model="title" required>
					<textarea   placeholder="Enter you report message" cols="30"  class="formEle" rows="15" v-model="message"></textarea>
					<div v-for="(error,i) in errors" :key="i">
						<h4 class="errors">
							{{error}}
						</h4>
						<br/>
					</div>
					<input type="submit" :disabled="loading" class="formEle btn" :value="isLoading">
				</form >
				<p style="color: green" v-if="upload">You report Submits</p>
			</div>
		</div>
	</transition>
</template>


<script>
    import API from "@/store/API";
export default {
    props:['url'],
  data() {
    return {
      title: "",
      loading: false,
      errors: [],
		upload:false,
        message:"",
    };
  },
  methods: {
    send(e) {
      e.preventDefault();
      	this.loading=true;
        API.post('/pushReport',{
            title:this.title,
            message:this.message,
			url:this.url,
		}).then((res)=>{
            this.loading=false;
            this.upload=true;
		}).catch((err)=>{
            this.loading=false;
        });
    }
  },
  computed: {
    isLoading() {
      return this.loading ? "Loading.." : "Submit";
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
