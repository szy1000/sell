<template>
	<transition name="move">
		<div v-show="showFlag" class="food" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="">
					<div class="back" @click="hide">
						<i class="iconfont icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月销{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count ===0 ">
							加入购物车
						</div>
					</transition>
				</div>
			</div>
			<split  v-show="food.info"></split>
			<div class="info" v-show="food.info"> 
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
	import split from '../../components/split/split.vue'


 export default{
 	props:{
		food:{
			type: Object
			}
		},
		components:{
			cartcontrol,
			split
		},
		data(){
			return{
				showFlag:false,
			}
		},
		methods: {
			show(){
				this.showFlag = true;
				this.$nextTick( () => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click: true
						})
					}else{
						this.scroll.refresh()
					}
				})
			},
			hide(){
				this.showFlag = false;
			},
			addFirst(event){
				if(!event._constructed){
					return;
				}
				Vue.set(this.food,'count',1)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		width: 100%;
		z-index: 30;
		background-color: #fff;
		.food-content{
			.image-header{
				position: relative;
				width: 100%;
				height: 0;
				padding-top:100%;
				img{
					position: absolute;
					left:0;
					top:0;
					width: 100%;
					height: 100%;
				}
				.back{
					position: absolute;
					top: 10px;
					left: 10px;
					background-color:rgba(0,0,0,.9);
					border-radius: 50%;
				}
				.icon-arrow_lift{
					display:block;
					padding: 10px;
					font-size: 20px;
					color:#fff;
				}
			}
		}
		.content{
			padding: 18px;
			h1{
				margin-bottom: 8px;
				font-size: 14px;
				font-weight: 700;
				color:$gray-dark;
				line-height: 14px;
			}
			.detail{
				margin-bottom: 18px;
				font-size: 0;
				line-height: 10px;
				height: 10px;
				color: $gray-base;
				.sell-count{
					margin-right: 12px;
					font-size: 10px;
				}
				.rating{
					font-size: 10px;
				}
			}
			.price{
				font-size:0;
				font-weight:700;
				line-height: 24px;
				.now{
					margin-right:8px;
					font-size:10px;
					color:rgb(240,20,20);
				}
				.old{
					font-size:10px;
					color:rgb(147,153,159);
					text-decoration:line-through;
				}
			}
		}

		.cartcontrol-wrapper{
			position: absolute;
			right: 12px;
			bottom:12px;
		}
		.buy{
			position: absolute;
			right:18px;
			bottom: 18px;
			z-index: 10;
			height: 24px;
			line-height: 24px;
			padding: 0 12px;
			box-sizing:border-box;
			font-size: 10px;
			border-radius: 12px;
			color:#fff;
			background-color: rgb(0,160,220);
		}
		.fade-enter-active, .fade-leave-active{
			transition: opacity 0.3s;
		}
		.fade-enter,.fade-leave-active{
			opacity:0;
		}

		.info{
			padding:18px;
			.title{
				line-height: 14px;
				margin-bottom:6px;
				font-size: 14px;
				color:rgb(7,17,27);
			}
			.text{
				padding: 0 8px;
				line-height: 24px;
				font-weight:200;
				font-size: 12px;
				color: rgb(77,85,93);
			}
		}
	}
	.move-enter-active, .move-leave-active{
		transition: all 0.2s linear;
		transform: translate3D(0,0,0);
	}
	.move-enter,.move-leave-active{
		transform: translate3D(100%,0,0);
	}
	
</style>
