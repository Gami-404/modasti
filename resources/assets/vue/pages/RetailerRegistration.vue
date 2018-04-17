<template>
  <div class="gridContainer">
		<div class="secPaddLg">
			<form @submit.prevent="register">
				<div class="myrow clearfix">
					<div class="mycol-md-9">
						<div class="myrow clearfix">
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">First name : *</div>
									<input type="text" v-model="form.first_name" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">last name : *</div>
									<input type="text" v-model="form.last_name" class="inputEle" required="">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">brand name/ company : *</div>
									<input type="text" v-model="form.brand" class="inputEle" required="">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">website : *</div>
									<input type="text" v-model="form.website" class="inputEle" required="">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Phone number : *</div>
									<input type="text" v-model="form.phone" class="inputEle" required="">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Email address : *</div>
									<input type="text"  v-model="form.email" class="inputEle" required="">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">country : *</div>
									<input type="text" class="inputEle" required="">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">city : *</div>
									<input type="text"  class="inputEle" required="">
								</div>
							</div>

							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">password : *</div>
									<input type="password" class="inputEle" required="">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">repeat password : *</div>
									<input type="password" class="inputEle" required="">
								</div>
							</div>
						</div>
						<div class="mrgBtmLg">
							<input type="checkbox" id="termsCheckbox">
							<label for="termsCheckbox"> I agree with <a href="#" class="brandColor">Terms and Conditions</a></label>
						</div>
						<div class="row clearfix">
							<div class="mycol-md-6">
								<input type="submit" value="Register" class="inputEle brandBg">
							</div>
						</div>
					</div>
					
				</div>
				
			</form>
		</div>
	</div>
</template>

<script>

	export default {

	    data(){
	        return {
	            form: {
                    first_name: "",
                    last_name: "",
					brand: "",
					website:"",
					phone:"",
					email:"",
					country:"",
					city:"",
					password: ""
				}
			}
		},

	    mounted(){

		},

		methods: {

            register(){

                self.$store.dispatch("register", self.form).then(function () {


                }, function (response) {



                }).then(function (response) {
                    self.submitted = false;
                });

			}

		}
	}

</script>
