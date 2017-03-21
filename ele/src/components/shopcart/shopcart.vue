<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left" >
				<div class="logo-wrapper">
					<div class="logo" :class="{'hightlight':totalCount > 0}">
						<i class="iconfont icon-shopping_cart" :class="{'hightlight':totalCount > 0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'hightlight':totalCount > 0}">{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<div v-for="ball in balls" v-show="ball.show">
				<transition name="drop">
					<div class="inner">
						
					</div>
				</transition>
			</div>
		</div>

		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty">清空</span>
			</div>
			<div class="list-content">
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price * food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food= "food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'

  export default {
  	props:{
  		selectFoods: {
  			type: Array,
  			default() {
  				return [{
  					price:10,
  					count:0
  				}];
  			}
  		},
  		deliveryPrice:{
  			type: Number,
  			default: 0
  		},
  		minPrice:{
  			type:Number,
  			default: 20
  		},
  	},
  	components:{
			cartcontrol
		},
  	data(){
  		return {
  			balls:[
  				{ show : false },
  				{ show : false },
  				{ show : false },
  				{ show : false },
  				{ show : false },
  			],
  			fold: false
  		}
  	},
  	methods: {
  		drop(el){
  			//暂未解决
  			console.log(1);
  			console.log(el);
  		},

  		toggleList() {
  			if(!this.totalCount){
  				return;
  			}
  			this.fold = !this.fold;
  		}
  	},
  	computed:{
  		totalPrice(){
  			let total = 0;
  			this.selectFoods.forEach((food) => {
  				total += food.price * food.count; 
  			});
  			return total;
  		},
  		totalCount(){
  			let count =0;
  			this.selectFoods.forEach((food)=>{
  				count += food.count
  			})
  			return count;
  		},
  		payDesc(){
  			if(this.totalPrice === 0){
  				return '￥'+this.minPrice+'元起送';
  			}else if(this.totalPrice < this.minPrice){
  				let diff = this.minPrice - this.totalPrice;
  				return '还差￥'+diff+'元起送';
  			}else{
  				return '去结算'
  			}
  		},
  		payClass() {
  			if(this.totalPrice < this.minPrice){
  				return 'not-enough';
  			}else{
  				return 'enough';
  			}
  		},
  		listShow(){
  			if( !this.totalCount ){
  				this.fold = true;
  			}
  			let show = !this.fold;
  			return true;
  		}
  	}
  }
</script>

<style lang="scss" scoped>
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index:98;
		width:100%;
		height:48px;
		.content{
			display:flex;
			background-color: #141d27;
			font-size: 0;
		}
		.content-left{
			flex:1
		}
		.logo-wrapper,.price,.desc{
			display:inline-block;
			vertical-align:top;
		}
		.logo-wrapper{
			position: relative;
			top:-10px;
			margin: 0 12px;
			padding: 6px;
			width:56px;
			height:56px;
			box-sizing:border-box;
			border-radius: 50%;
			background-color: #141d27;
			.logo{
				width: 100%;
				height:100%;
				border-radius: 50%;
				background-color: #2b343c;
				text-align:center;
				&.hightlight{
					background-color: rgb(0,160,200);
				}
				.icon-shopping_cart{
					line-height: 44px;
					font-size:24px;
					color: #808558;
					&.hightlight{
						color: #fff;
					}
				}
			}
			.num{
				position: absolute;
				top:0;
				right:0;
				padding:0 8px;
				height: 16px;
				line-height: 16px;
				border-radius:16px;
				font-size: 9px;
				font-weight:700;
				color:#fff;
				background: rgb(240, 20,20);
				box-shadow:0 4px 8px 0 rgba(0,0,0,.4);
			}
		}
		.price{
			margin-top:12px;
			line-height: 24px;
			padding-right: 12px;
			box-sizing: border-box;
			color:rgba(255, 255, 255,.4);
			border-right: 1px solid rgba(255, 255, 255,.4);
			font-size: 16px;
			font-weight: 700;
			&.hightlight{
				color:rgb(255,255,255);
			}
		}
		.desc{
			margin: 12px 0 0 12px;
			line-height: 24px;
			color: rgba(255,255,255,.4);
			font-size: 10px;
		}

		.content-right{
			flex: 0 0 105px;
			width:105px;
			.pay{
				height: 48px;
				line-height: 48px;
				text-align:center;
				font-size: 12px;
				font-weight: 700;
				color:rgba(255, 255, 255,.4);
				&.not-enough{
					background-color: #2b333b;
				}
				&.enough{
					color:#fff;
					background: #00b43c;
				}
			}
		}

		.ball-container{
			.ball{
				position: fixed;
				left:32px;
				bottom:22px;
				z-index:100;
				.drop-enter-active, .drop-leave-active{
					transition: all 0.5s linear;
					transform: translate3D(0,0,0) rotate(0deg);
					.inner{
						width:16px;
						height:16px;
						border-radius:50%;
						background: rgb(0,160,220);
						transition: all .4s;
					}
				}
			}
		}

		.shopcart-list{
			position: absolute;
			top: 0;
			left: 0;
			width:100%;
		}
	}
</style>
