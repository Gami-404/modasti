<template>
	<div class="gridContainer">

		<div class="proudctDetails secondStyle">
			<div class="clearfix">
				<div class="avatar"><img src="images/img5.jpg" alt=""></div>
				<div class="content">
					<div class="in">

						<div class="paging">
							<a href="#">Home</a>
							<a href="#">Contest</a>
						</div>

						<h2 class="title">{{info.title_en}}</h2>
						<div v-html="info.text2_en" class="description"></div>
						<h2 class="title">End date</h2>
						<div class="mrgBtmLg">
							{{days}} <span class="brandColor">Days</span> 
							{{hours}} <span class="brandColor">Hours </span> 
							{{minutes}} <span class="brandColor">mins</span> 
						</div>
						<div class="likesAndComments mrgBtmLg">
							<a href="#">
								<i class="icon-like"></i>
								<span>{{info.likes}}</span>
							</a>
							<a href="#">
								<i class="fa fa-share-alt"></i>
							</a>
						</div>
						<a href="#" class="mainBtn">Join contest</a>

					</div>
				</div>
			</div>
			<div class="PD_comments">
				<div class="addComment">
					<input type="text" class="inputEle" placeholder="Add comment">
					<a href="#" class="theIcon">
						<i class="fa fa-paper-plane"></i>
					</a>
				</div>
				<div class="theComments">
					<div class="one clearfix">
						<img src="images/img3.jpg" class="avatar" alt="">
						<a href="#" class="deleteComment">Delete</a>
						<div class="itsContent">
							<div class="message">Lorem Ipsum is simply dummy text of the printing and typesetting </div>
							<div class="time">02:00</div>
						</div>
					</div>
					<div class="one clearfix">
						<img src="images/img3.jpg" class="avatar" alt="">
						<a href="#" class="deleteComment">Delete</a>
						<div class="itsContent">
							<div class="message">Lorem Ipsum is simply dummy text of the printing and typesetting </div>
							<div class="time">02:00</div>
						</div>
					</div>
					<div class="one clearfix">
						<img src="images/img3.jpg" class="avatar" alt="">
						<a href="#" class="deleteComment">Delete</a>
						<div class="itsContent">
							<div class="message">Lorem Ipsum is simply dummy text of the printing and typesetting </div>
							<div class="time">02:00</div>
						</div>
					</div>
					<div class="one clearfix">
						<img src="images/img3.jpg" class="avatar" alt="">
						<a href="#" class="deleteComment">Delete</a>
						<div class="itsContent">
							<div class="message">Lorem Ipsum is simply dummy text of the printing and typesetting </div>
							<div class="time">02:00</div>
						</div>
					</div>
				</div>
				<a href="#" class="moreLinks">More Comments</a>
			</div>
		</div>

		<div class="sectionTitle clearfix">
			<h2 class="theName">Competitors</h2>
		</div>
		<div class="secPaddMd">
			<div class="myrow clearfix">
				<div v-for="(photo,i) of photos" :key="i" class="mycol-lg-3 mycol-sm-6">

				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	props: ["contest"],
	data () {
		return {
			days: 0,
			hours: 0,
			minutes:0
		}
	},
  computed: {
    photos() {
      return this.contest.photos;
    },
    info() {
      return this.contest.contest;
    }
  },
  created() {
    let countDownDate = new Date(this.info.expires).getTime();
		let culTime = () => {
			let now = new Date().getTime();
      let distance = countDownDate - now;
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		}
		culTime();
    var x = setInterval( culTime , 1000*60 );
  }
};
</script>
