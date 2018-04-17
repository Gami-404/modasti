<template>
	<div class="gridContainer">
		<div class="secPaddLg">
			<form action="#">
				<div class="myrow clearfix">
					<div class="mycol-md-9 mycol-sm-6">
						<div class="myrow clearfix">
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Item title :</div>
									<input v-model="form.title" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Category :</div>
									<input v-model="form.category" type="text" class="inputEle" placeholder="set category">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Short description :</div>
									<input v-model="form.description" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Coverage :</div>
									<select v-model="form.coverage" class="inputEle">
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
									<input v-model="form.brand" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Color :</div>
									<input v-model="form.color" type="text" class="inputEle" placeholder="set Color">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Web shop url :</div>
									<input v-model="form.shop_url" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Size :</div>
									<input v-model="form.size" type="text" class="inputEle" placeholder="set Size">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Price :</div>
									<input v-model="form.price" type="text" class="inputEle">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Size System :</div>
									<select v-model="form.sizeSystem" class="inputEle">
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
									<input v-model="form.sale_price" type="text" class="inputEle" placeholder="Ex: 15.00">
								</div>
							</div>
							<div class="mycol-md-6">
								<div class="mrgBtmLg">
									<div class="mrgBtmMd fontLarger">Currency :</div>
									<select v-model="form.currency"  class="inputEle">
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
						<input type="file" id="uploadImg" class="disNone" @change="processFile($event)">
						<div class="uploadedPhotoDisplay mrgBtmLg">
							<span class="fontLarger grayColor hideAfterUpload">No photo</span>
							<img :src="form.image" alt="">
						</div>
					</div>
				</div>

				<div class="myrow clearfix">
					<div class="mycol-md-9 mycol-sm-6">
						<div class="myrow clearfix">

							<div class="mycol-md-6">
							</div>							
							<div class="mycol-md-6">
								<div class="mrgBtmMd fontLarger">&nbsp;</div>
								<div class="clearfix">
									<a href="#" class="BF_btn">Cancel</a>
									<input type="submit" value="Register" class="BF_btn sbmt">
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
import {currency} from "./currency";
export default {
  data() {
    return {
      form: {
        title: "",						
				description: "",
				color:"",
				category:"",
				brand: "",
				shop_url:"",
				price:"",
				sale_price:"",
				size:"",
        coverage: "",
				sizeSystem: "",
				currency:"",
				image:""
      },
      currency
    };
	},
	methods:{
		processFile(e){
			this.form.image = FileReader().readAsDataURL(e.target.files[0]) ;
		}
	}
};
</script>

<style>
.inputEle {
  background: #ffffff;
}
</style>
