<template>
  
</template>

<script>
import Loading from "@/components/Loading"
export default {
	components:{
		Loading
	},
	data(){
		return { loading : true }
	},
computed:{
		user(){
			return this.$store.getters.userProfile
		},
		isCurrUser(){
			return this.$store.getters.user.userId == this.$route.params.userId;
		}
	},
	created(){
    let id = typeof this.$route.params.userId == "number" ? this.$route.params.userId : this.$store.getters.user.userId;		
		this.$store.dispatch("get_user_profile",id).then(()=>{
			this.loading = false;
		});
	}
}
</script>
