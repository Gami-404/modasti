<template>
  <div id="home">
	<div class="secPaddLg whiteBg textCentered">
		<div class="gridContainer">
			<div class="sectionName">
				<div class="theName">MODEST FASHION FOR ALL</div>
				<div class="second">FASHION + INSPIRE + LOVE</div>
			</div>
		</div>
	</div>
	
	<div class="gridContainer">
		
		<WrapperCardListTitled title="Latest Trends" url="#" >			
				<div v-for="(item,index) in Items" :key='index' class="mycol-lg-3 mycol-sm-6">
					<ItemCard
						:image="item.image"
						:price="item.price"
						:title="item.title"
						:link="item.link"
						:like="item.like"
						:comment="item.comment"
					/>
				</div>
		</WrapperCardListTitled>	

		
		<WrapperCardListTitled title="Most Liked From Our Community" url="#">	
				<div v-for="(item,index) in Items" :key='index' class="mycol-lg-3 mycol-sm-6">
					<ItemCard
						:image="item.image"
						:price="item.price"
						:title="item.title"
						:link="item.link"
						:like="item.like"
						:comment="item.comment"
					/>
				</div>
		</WrapperCardListTitled>

		<WrapperCardListTitled title="Most Viewed Sets" url="#" >
			<div v-for="(item,index) in Items" :key="index" class="mycol-lg-3 mycol-sm-6">
				<SetCard
					:image="item.image"
					:title="item.title"
					:link="item.link"
					:like="item.like"
					:comment="item.comment"
					:by="item.by"
				/>
			</div>
		</WrapperCardListTitled>

		<WrapperCardListTitled title="Official Contests" url="#" >
				<div v-for="(item,index) in Items" :key="index" class="mycol-lg-3 mycol-sm-6">
					<SetCard
						:image="item.image"
						:title="item.title"
						:link="item.link"
						:like="item.like"
						:comment="item.comment"
						:by="item.by"
					/>
				</div>
		</WrapperCardListTitled>		

	</div>
	
  </div>
</template>

<script>
import ItemCard from '../components/ItemCard';
import SetCard from '../components/SetCard';
import WrapperCardListTitled from '../components/wrappers/WrapperCardListTitled'

export default {
  components:{
	  ItemCard,
	  SetCard,
	  WrapperCardListTitled
  },
  computed: {
		Items(){
			let arr = [];
			const  Items = [ 
				{
					url: '',
					title: 'VELVET PUMPS WITH BEJEWELED HEELS',
					image: 'images/4.jpg',
					price: 520 ,
					url:'',
					like: 10,
					comment: 10,
					link:'dolcegabbana.com',
					by:'Modasti retail - Modasti' 					
				},
				{
					url: '',
					title: 'VELVET PUMPS WITH BEJEWELED HEELS',
					image: 'images/3.jpg',
					price: 320 ,
					url:'',
					like: 20,
					comment: 11,
					link:'dolcegabbana.com',
					by:'Modasti retail - Modasti' 					
				},
				{
					url: '',
					title: 'VELVET PUMPS WITH BEJEWELED HEELS',
					image: 'images/1.jpg',
					price: 120 ,
					url:'',
					like: 5,
					comment: 2,
					link:'dolcegabbana.com',
					by:'Modasti retail - Modasti' 
				},
			];
			
			for (let i = 0; i < 8; i++) {
				arr.push( Items[Math.floor(Math.random()*3)] );
			} 
			return arr;
		}
  }
}
</script>
