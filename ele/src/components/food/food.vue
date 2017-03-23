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
				<split  v-show="food.info"></split>
				<div class="info" v-show="food.info"> 
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect @select="selectRating" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent"
					:desc="desc" :ratings="food.ratings"></ratingselect>

					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" width="12" height="12" alt="" class="avatar">
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>
									{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	import {formatDate} from '../../common/js/date.js'
	import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
	import split from '../../components/split/split.vue'
	import ratingselect from '../../components/ratingselect/ratingselect.vue'
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
 	export default{
	 	props:{
			food:{
				type: Object
				}
			},
			filters:{
				formatDate(time){
					let date = new Date(time);
					return formatDate(date,'yyyy-MM-dd hh:mm')
				}
			},
			components:{
				cartcontrol,
				split,
				ratingselect			
			},
			data(){
				return{
					showFlag:false,
					selectType:ALL,
					onlyContent:true,
					desc:{
						all:'全部',
						positive:'推荐',
						negative:'吐槽'
					}
				}
			},
			methods: {
				show(){
					this.showFlag = true;
					this.selectType = ALL;
					this.onlyContent = false;
					this.$nextTick(() => {
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.food,{
								click: true
							});
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
				},
				selectRating(type){
					this.selectType = type;
					this.$nextTick(() => {
						this.scroll.refresh();
					})
				},
				toggleContent(){
					this.onlyContent = !this.onlyContent;
					this.$nextTick(() => {
						this.scroll.refresh();
					})
				},
				needShow(type,text){
					if(this.onlyContent && !text){
						return false
					}
					if(this.selectType === ALL){
						return true;
					}else{
						return type === this.selectType;
					}
				}
			},
			events:{
				'ratingtype.select'(type){
					this.selectType = type;
					this.$nextTick(() => {
						this.scroll.refresh();
					})
				},
				'content.toggle'(onlyContent){
					this.onlyContent = onlyContent;
					this.$nextTick(() => {
						this.scroll.refresh();
					})
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
//		padding-bottom:30px;
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
			position: relative;
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
		.rating{
			padding-top: 18px;
			.title{
				line-height: 14px;
				margin-left: 18px;
				font-size: 14px;
				color:$gray-dark;
			}
			.rating-wrapper{
				padding: 0 18px;
				.rating-item{
					position: relative;
					padding: 16px 0;
					@include border-1px(rgba(7,17,27,.1));
					.user{
						position: absolute;
						right:0;
						top:16px;
						line-height: 16px;
						font-size: 0;
						.name{
							display:inline-block;
							margin-right:6px;
							vertical-align: top;
							font-size: 10px;
							color:rgb(147,153,159);
						}
						.avatar{
							border-radius:50%;
						}
					}
					.time{
						margin-bottom:6px;
						line-height: 12px;
						font-size: 10px;
						color:$gray-base;
					}
					.text{
						line-height: 16px;
						font-size: 12px;
						color: rgb(7,17,27);
						.icon-thumb_up,.icon-thumb_down{
							margin-right: 4px;
							line-height: 24px;
							font-size: 12px;
						}
						.icon-thumb_up{
							color: rgb(0, 160, 220);
						}
						.icon-thumb_down{
							color: $gray-base;
						}
					}
				}
			}
			.no-rating{
				padding: 16px 0;
				font-size: 12px;
				color:rgb(147, 153, 159);
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
