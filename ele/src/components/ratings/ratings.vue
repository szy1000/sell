<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent"
				:ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar" alt="">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<div class="delivery" v-show="rating.deliveryTime">
									{{rating.deliveryTime}}
								</div>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<i class="iconfont icon-thumb_up"></i>

								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import {formatDate} from '../../common/js/date.js'
  import star from '../../components/star/star'
	import split from '../../components/split/split.vue'
	import ratingselect from '../../components/ratingselect/ratingselect.vue'

	const ALL = 2;
	const ERR_OK = 0;

	export default {
		props:{
			seller:{
				type: Object
			}
		},
		filters:{
			formatDate(time){
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		data(){
			return{
				ratings:[],
				selectType:ALL,
				onlyContent:true,
			}
		},
		components:{
			star,
			split,
			ratingselect
		},
		created(){
			this.$http.get('/api/ratings').then((response) => {
				response = response.body;
				if(response.errno === ERR_OK){
					this.ratings = response.data;
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.ratings,{
							click: true
						})
					})
				}
			})
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
		},
		methods:{
			needShow(type,text){
				if(this.onlyContent && !text){
					return false
				}
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			},
			
		}
	}
</script>

<style lang="scss"> 
	@import '../../common/scss/mixin.scss';
	.ratings{
		position: absolute;
		top:174px;
		bottom: 0;
		width: 100%;
		overflow:hidden;
		.overview{
			display:flex;
			padding: 18px 0;
			.overview-left{
				padding:6px 0;
				flex: 0 0 137px;
				width: 137px;
				border-right:1px solid rgba(7,17,27,.1);
				text-align:center;
				.score{
					margin-bottom: 6px;
					font-size: 24px;
					line-height: 28px;
					color:rgb(255, 153, 0);
				}
				.title{
					margin-bottom: 8px;
					font-size: 12px;
					line-height: 12px;
					color: rgb(7, 17, 27);
				}
				.rank{
					font-size: 10px;
					color:rgb(147, 153, 159);
					line-height: 10px;
				}
				@media only screen and (max-width: 320px){
					flex: 0 0 120px;
					width: 120px;
				}
			}
			.overview-right{
				padding: 6px 0 6px 24px;
				flex:1;
				padding-left:24px;
				@media only screen and (max-width: 320px){
					padding-left:6px;
				}
				.score-wrapper{
					margin-bottom: 8px;
					font-size: 0;
					.title{
						display:inline-block;
						vertical-align: top;
						font-size: 12px;
						line-height: 18px;
						color:rgb(7, 17, 27);
					}
					.star{
						display:inline-block;
						vertical-align: top;
						margin: 0 12px;
					}
					.score{
						display:inline-block;
						vertical-align: top;
						line-height: 18px;
						font-size: 12px;
						color:rgb(255, 153, 0);
					}
				}
				.delivery-wrapper{
					font-size: 0;
					.title{
						margin-right: 12px;
						font-size: 12px;
						line-height: 18px;
						color:rgb(7, 17, 27);
					}
					.delivery{
						font-size: 10px;
						color:rgb(147, 153, 159);
					}
				}
			}
		}

		.rating-wrapper{
			padding: 0 18px;
			.rating-item{
				display: flex;
				padding: 18px 0;
				@include border-1px(rgba(7,17,27,.1));
				.avatar{
					margin-right: 12px;
					img{
						border-radius: 50%;
					}
				}
				.content{
					position:relative;
					flex:1;
					.name{
						margin-bottom: 4px;
						line-height: 12px;
						font-size: 10x;
						color:rgb(7,17,27);
					}
					.star-wrapper{
						margin-bottom: 6px;
						font-size:0;
						.star{
							display:inline-block;
							margin-right:6px;
							vertical-align:top;
						}
						.delivery{
							display:inline-block;
							vertical-align:top;
							line-height: 12px;
							font-size: 10px;
							color:rgb(147,157, 159);
						}
					}
					.text{
						margin-bottom:8px;
						line-height: 18px;
						color:$gray-dark
					}
					.recommend{
						font-size:0;
						line-height: 16px;
						.icon-thumb_up,.item{
							display:inline-block;
							margin:0 8px 4px 0;
							font-size:9px;
						}
						.icon-thumb_up{
							color:rgb(0,160,220);
						}
						.item{
							padding: 0 6px;
							border: 1px solid rgba(7,17,27,.1);
							border-radius: 1px;
							color:$gray-base;
						}
					}
					.time{
						position: absolute;
						top: 0;
						right: 12px;
						line-height: 12px;
						font-size: 10px;
						color:$gray-base;
					}
				}
			}
		}
	}
</style>