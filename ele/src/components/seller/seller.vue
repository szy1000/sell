<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="text">{{seller.ratingCount}}</span>
					<span class="text">月销{{seller.sellCount}}份</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<i class="icon-favorite" :class="{ 'active': favorite }"></i>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin border-1px">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
			</div>
			<ul v-if="seller.supports" class="supports">
				<li class="support-item border-1px" v-for="(item ,index) in seller.supports">
					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
					<span class="text">{{seller.supports[index].description}}</span>
				</li>
			</ul>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList" >
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" alt="" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item border-1px" v-for="info in seller.infos">{{ info }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import star from '../../components/star/star'
	import {saveToLocal ,loadFromLocal} from '../../common/js/store'
	import split from '../../components/split/split'

	export default {
	  props:{
	  	seller:{
	  		type:Object
	  	}
	  },
	  data() {
	  	return {
	  		favorite: (() =>{
	  			return loadFromLocal(this.seller.id,'favorite',false)
	  		})(),
	  	}
	  },
	  computed: {
	  	favoriteText() {
	  		return this.favorite ? '已收藏' : '收藏';
 	  	}
	  },
	  created() {
			this.classMap = ['decrease','discount','guarantee','invoice','special']
		},
		watch:{
			'seller'(){
				this._initScroll();
			}
		},
		mounted() { 
			this._initScroll();
			if(this.seller.pics){
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth +margin) * this.seller.pics.length - margin;
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						this.picScroll = new BScroll(this.$refs.picWrapper,{
							scrollX: true,
							eventPassthrough: 'vertical'
						})
					}) 
				}else{
					this.scroll.refresh();
				}
		},
		methods:{
			_initScroll(){
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.seller,{
						click: true,
					})
				}else{
					this.scroll.refresh();
				}
			},
			toggleFavorite(event){
				if(!event._constructed){
					return false
				}
				this.favorite = !this.favorite;
				localStorage.favorite = this.favorite;
			}
		},
		components:{
	  	star,split
	  },
	}
</script>

<style lang="scss"> 
	@import '../../common/scss/mixin.scss';

	.seller{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow:hidden;
		.overview{
			position: relative;
			padding: 18px;
			.title{
				margin-bottom: 8px;
				font-size: 14px;
				line-height: 14px;
				color:rgb(7,17,27);
			}
			.desc{
				padding-bottom:18px;
				@include border-1px(rgba(7,17,27,.1));
				font-size:0;
				.star{
					display:inline-block;
					margin-right: 8px;
					vertical-align: top;
				}
				.text{
					display:inline-block;
					margin-right: 12px;
					line-height: 18px;
					vertical-align:top;
					font-size: 10px;
					color:rgb(77,85,93);
				}
			}
			.remark{
				display:flex;
				padding-top: 18px;
				.block{
					flex: 1;
					text-align: center;
					border-right: 1px solid rgba(7,17,27,.1);
					&:last-child{
						border-right: none;
					}
					h2{
						margin-bottom:4px;
						line-height:10px;
						font-size: 10px;
						color:rgb(147,153,159);
					}
					.content{
						line-height: 24px;
						font-size: 10px;
						color: rgb(7,17,27);
						.stress{
							font-size: 24px;
						}
					}
				}
			}
			.favorite{
				position: absolute;
				right: 11px;
				top: 18px;
				text-align: center;
				.icon-favorite{
					display: block;
					margin-bottom: 4px;
					color: #d4d6d9;
					font-size: 24px;
					line-height: 24px;
					&.active{
						color: rgb(240, 20 , 20);
					}
				}
				.text{
					font-size: 10px;
					line-height: 10px;
					color:rgb(77, 85, 93)
				}
			}
		}
		.bulletin{
			padding: 18px 18px 0 18px;
			.title{
				margin-bottom:8px;
				line-height: 14px;
				color: rgb(7,17,27);
				font-size: 14px;
			}
			.content-wrapper{
				padding: 0 12px 16px 12px;
				@include border-1px(rgba(7,17,27,.1));
				.content{
					line-height: 24px;
					font-size: 12px;
					color: rgb(240, 20, 20);
				}
			}
		}
		.supports{
			padding: 0 18px;
			.support-item{
				padding: 16px 12px;
				font-size: 0;
				@include border-1px(rgba(7,17,27,.1));
				&:last-child{
					@include border-none(#fff);
				}
				.icon{
					display:inline-block;
					margin-right:4px;
					width:12px;
					height:12px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease{
						@include bg-images('decrease_4');
					}
					&.discount{
						@include bg-images('discount_4');
					}
					&.guarantee{
						@include bg-images('guarantee_4');
					}
					&.invoice{
						@include bg-images('invoice_4');
					}
					&.special{
						@include bg-images('special_4');
					}
				}
				.text{
					line-height:12px;
					font-size: 10px;
					vertical-align:top;
				}
			}
		}
		.pics{
			padding: 18px;
			.title{
				margin-bottom: 12px;
				font-size: 14px;
				line-height: 14px;
				color:rgb(7,17,27);
			}
			.pic-wrapper{
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				.pic-list{
					font-size: 0;
					.pic-item{
						display: inline-block;
						margin-right: 6px;
						&:last-child{
							margin-right: 0;
						}
					}
				}
			}
		}
		.info{
			padding: 18px 18px 0;
			.title{
				padding-bottom: 12px;
				@include border-1px(rgba(7,17,27,.1));
				font-size: 14px;
				line-height: 14px;
				color:rgb(7,17,27);
			}
			.info-item{
				padding: 16px 12px;
				line-height: 16px;
				@include border-1px(rgba(7,17,27,.1));
				&:last-child{
					margin: 0;
				}
			}
		}
	}
</style>