<template>
	<div class="gridContainer">
		<div class="secPaddLg">

			<div class="errors">
				<p v-for="error in errors">{{ error }}</p>
			</div>

			<form @submit.prevent="register">
				<div class="myrow clearfix">
					<div class="mycol-md-9">
						<div class="myrow clearfix">
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">First name : *</div>
									<input type="text" required="required" v-model="form.first_name" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Last name : *</div>
									<input type="text" required="required" v-model="form.last_name" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">brand name/ company : *</div>
									<input type="text" required="required" v-model="form.brand_name" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">website : *</div>
									<input type="text" required="required" v-model="form.website" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Phone number : *</div>
									<input type="text" required="required" v-model="form.phone" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Email address : *</div>
									<input type="email" required="required"  v-model="form.email" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">country : *</div>
									<select name="country_id" required="required" v-model="form.country_id" class="inputEle">
										<option v-for="country in countries" :value="country.id">{{ country.title_en }}</option>
									</select>
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">City : *</div>
									<input type="text" required="required" v-model="form.city_name" class="inputEle">
								</div>
							</div>

							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">password : *</div>
									<input type="password"  v-model="form.password" required="required" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">repeat password : *</div>
									<input type="password" required="required" class="inputEle">
								</div>
							</div>
						</div>
						<div class="mrgBtmLg">
							<input type="checkbox" id="termsCheckbox" v-model="termsAgreed">
							<label for="termsCheckbox"> I agree with <a href="#" class="brandColor">Terms and Conditions</a></label>
						</div>
						<div class="row clearfix">
							<div class="mycol-md-6">
								<button :disabled="btnText==='Saving..'" class="inputEle brandBg">{{btnText}}</button>
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

        computed: {
            countries(){
                return this.$store.getters.getCountries
            },
            sizes(){
                return this.$store.getters.getSizes
            }
        },

        data(){
            return {
                form: {
                    first_name: "ahmed",
                    last_name: "ahmedff",
                    brand_name: "beso",
                    website:"http://sdf.com",
                    phone:"01412451524",
                    email:"ads@gamil.com",
                    country_id:16,
                    city_name:"dsaf",
                    password: "3234324"
                },
                btnText:"Register",
                termsAgreed: false,
                errors: []
            }
        },

        mounted(){
            alert("fs");
            this.$store.dispatch("get_countries");
        },

        methods: {

            register(){

                if(!this.termsAgreed){
                    alert("Terms and Conditions must be agreed");
                    return false;
                }

                this.$store.dispatch("add_retailer", this.form).then(function (response) {
                    this.errors = response.data.errors;
                });
            }

        }
    }

</script>
