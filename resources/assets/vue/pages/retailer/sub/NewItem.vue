<template>
	<div class="gridContainer">
		<div class="secPaddLg">
			<form @submit.prevent="submit" action="#">
				<div class="myrow clearfix">
					<div class="mycol-md-9 mycol-sm-6">
						<div class="myrow clearfix">
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Item title :</div>
									<input required v-model="form.title" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Category :</div>
									<input required v-model="form.category" type="text" class="inputEle" placeholder="set category">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Short description :</div>
									<input required v-model="form.description" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Coverage :</div>
									<select required v-model="form.coverage" class="inputEle">
										<option hidden value="">...</option>
										<option value="1">low</option>
										<option value="2">medium</option>
										<option value="3">high</option>
										<option value="4">full</option>
									</select>
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Item Brand :</div>
									<input required v-model="form.brand" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Color :</div>
									<input required v-model="form.color" type="text" class="inputEle" placeholder="set Color">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Web shop url :</div>
									<input required v-model="form.shop_url" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Size :</div>
									<input required v-model="form.size" type="text" class="inputEle" placeholder="set Size">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Price :</div>
									<input required v-model="form.price" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Size System :</div>
									<select required v-model="form.sizeSystem" class="inputEle">
										<option hidden value="">...</option>
										<option value="eu">EU</option>
										<option value="uk">UK</option>
										<option value="us">US</option>
									</select>
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Sale price :</div>
									<input required v-model="form.sale_price" type="text" class="inputEle" placeholder="Ex: 15.00">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Currency :</div>
									<select required v-model="form.currency" class="inputEle">
										<option hidden value="">...</option>
										<option v-for="curr of currency" :key="curr" :value="curr">{{curr}}</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div class="mycol-md-3 mycol-sm-6">
						<div class="mrgBtmMd fontLarger">Images</div>
						<label for="uploadImg" class="inputEle brandBg vCenter textCentered mrgBtmLg"> Upload Image </label>
						<input required type="file" id="uploadImg" class="disNone" @change="processFile($event)">
						<div class="uploadedPhotoDisplay mrgBtmLg">
							<span v-if="form.image === ''" class="fontLarger grayColor hideAfterUpload">No photo</span>
							<img :src="form.image" alt="">
						</div>
					</div>
				</div>
				<div class="myrow clearfix">
					<div class="mycol-md-9 mycol-sm-6">
						<div class="myrow clearfix">
							<div class="mycol-md-6">
								<div v-for="error in errors" :key="error">
									<h4 class="errors">
										{{error}}
									</h4>
									<br/>
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmMd fontLarger">&nbsp;</div>
								<div class="clearfix">
									<router-link to="allitems" class="BF_btn">Cancel</router-link>
									<button type="submit" class="BF_btn sbmt"> {{ sending ? 'Loading...' : 'Submit' }} </button>
								</div>
							</div>

						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { currency } from "./currency";
export default {
  name: "new-item",
  data() {
    return {
      form: {
        title: "",
        description: "",
        color: "",
        category: "",
        brand: "",
        shop_url: "",
        price: "",
        sale_price: "",
        size: "",
        coverage: "",
        sizeSystem: "",
        currency: "",
        image: ""
      },
      loadig: false,
      sending: false,
      errors: [],
      currency
    };
  },
  methods: {
    processFile(e) {
      let input = e.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.form.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    submit() {
      this.sending = true;
      this.$store
        .dispatch("add_new_item")
        .then(() => {
          this.sending = false;
          this.$router.push("allitems");
        })
        .catch(err => {
          if (err.response && err.response.data.errors) {
            this.errors = err.response.data.errors;
          } else {
            this.$router.push("/500");
          }
        });
    }
  }
};
</script>

<style>
.inputEle {
  background: #ffffff;
}
.errors {
  color: red;
}
</style>
