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
		
		<WrapperHomeCardList title="Latest Trends" url="#" >			
				<div v-for="(item,index) in products" :key='index' class="mycol-lg-3 mycol-sm-6">
					<ProductCard
						:image="item.image"
						:price="item.price"
						:title="item.title"
						:link="item.link"
						:like="item.like"
						:comment="item.comment"
					/>
				</div>
		</WrapperHomeCardList>	

		
		<WrapperHomeCardList title="Most Liked From Our Community" url="#">	
				<div v-for="(item,index) in products" :key='index' class="mycol-lg-3 mycol-sm-6">
					<ProductCard
						:image="item.image"
						:price="item.price"
						:title="item.title"
						:link="item.link"
						:like="item.like"
						:comment="item.comment"
					/>
				</div>
		</WrapperHomeCardList>

		<WrapperHomeCardList title="Most Viewed Sets" url="#" >
			<div v-for="(item,index) in products" :key="index" class="mycol-lg-3 mycol-sm-6">
				<SetCard
					:image="item.image"
					:title="item.title"
					:link="item.link"
					:like="item.like"
					:comment="item.comment"
					:by="item.by"
				/>
			</div>
		</WrapperHomeCardList>

		<WrapperHomeCardList title="Official Contests" url="#" >
				<div v-for="(item,index) in products" :key="index" class="mycol-lg-3 mycol-sm-6">
					<SetCard
						:image="item.image"
						:title="item.title"
						:link="item.link"
						:like="item.like"
						:comment="item.comment"
						:by="item.by"
					/>
				</div>
		</WrapperHomeCardList>		

	</div>
	
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard';
import SetCard from '../components/SetCard';
import WrapperHomeCardList from '../components/wrappers/WrapperHomeCardList'

export default {
  components:{
	  ProductCard,
	  SetCard,
	  WrapperHomeCardList
  },
  computed: {
		products(){
			let arr = [];
			const  products = [ 
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
				arr.push( products[Math.floor(Math.random()*3)] );
			} 
			return arr;
		}
  }
}
</script>
