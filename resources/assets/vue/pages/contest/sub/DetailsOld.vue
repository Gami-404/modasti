<template>
	<div v-if="contest" class="gridContainer">
		<div class="proudctDetails secondStyle">
			<div class="clearfix">
				<div class="avatar"><img :src="(contest['photo']&&contest['photo']['photo_name'])||'images/img5.jpg'" alt=""></div>
				<div class="content">
					<div class="in">
						<div class="paging">
							<a href="#">Home</a>
							<a href="#">Contest</a>
						</div>
						<h2 class="title">{{contest.text_en}}</h2>
						<div v-html="contest.text2_en" class="description">
						</div>
						<CardActions :likeable="true" :is-liked="contest.is_liked" :commentable="true" :sharable="true" :obj-id="contest.id" :num-of-likes="contest.likes" :num-of-comments="contest.comment" context="contest" />
					</div>
				</div>
			</div>
			<div class="PD_winner clearfix">
				<div class="itsTitle">
					<span>The Winner</span>
				</div>
				<div class="itsContent">
					<div class="PD_Card">
						<div class="PD_cardAvatar"><img src="images/img5.jpg" alt=""></div>
						<div class="PD_cardContent">
							<h3>
								<a href="#">Milan fashionweek</a>
							</h3>
							<hr>
							<div class="createdBy">Created by</div>
							<div>Modasti retail - Modasti</div>
						</div>
						<CardActions :likeable="true" :is-liked="contest.is_liked" :commentable="true" :sharable="true" :obj-id="contest.id" :num-of-likes="contest.likes" :num-of-comments="contest.comment" context="contest_photo" />
					</div>
					<div class="PD_about">
						<div class="PD_aboutUser clearfix">
							<img src="images/img3.jpg" alt="" class="itsAvatar">
							<div class="itsData">
								<div class="name">User Name</div>
								<div class="brandColor joinedDate">Joined on 22. 02. 2017</div>
								<div>
									<a href="#" class="mainBtn">Follow</a>
								</div>
							</div>
						</div>
						<div class="description">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
						</div>
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
	</div>
</template>

<script>
import CardActions from "@/components/CardActions";

export default {
  props: ["contest"],
  components: {
    CardActions
  }
};
</script>
