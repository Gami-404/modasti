<template>
    <div class="gridContainer">

        <div class="proudctDetails">
            <div class="avatar"><img src="images/1.jpg" alt=""></div>
            <div class="content">
                <div class="in">

                    <div class="paging">
                        <a href="#">Clothing</a>
                        <a href="#">Dresses</a>
                    </div>

                    <h2 class="title">VELVET PUMPS WITH BEJEWELED HEELS</h2>
                    <div class="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, </div>
                    <div class="info clearfix">
                        <div class="price">725$</div>
                        <a href="#" class="link">dolcegabbana.com</a>
                    </div>
                    <div class="likesAndComments">
                        <a href="#">
                            <i class="icon-like"></i>
                            <span>10</span>
                        </a>
                        <a href="#">
                            <i class="icon-comment"></i>
                            <span>10</span>
                        </a>
                    </div>

                </div>
            </div>
        </div>

        <WrapperCardListTitled title="Latest Trends" url="#">
            <div v-for="(item,index) in Items" :key='index' class="mycol-lg-3 mycol-sm-6">
                <ItemCard 
                :image="item.image" 
                :price="item.price" 
                :title="item.title" 
                :link="item.link" :like="item.like" 
                :comment="item.comment" />
            </div>
        </WrapperCardListTitled>

    </div>
</template>

<script>
import WrapperCardListTitled from "../components/wrappers/WrapperCardListTitled";
import ItemCard from "../components/ItemCard";

export default {
  components: {
    WrapperCardListTitled,
    ItemCard
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
};
</script>
