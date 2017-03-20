<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{ 'current': currentIndex === index}">
					<span class="text">
						<span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" alt="">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	const ERR_OK = 0;

	export default {
		props:{
			seller:{
				type: Object
			}
		},
		data(){
			return {
				goods:[],
				listHeight:[],
				scrollY: 0
			}
		},
		computed:{
			currentIndex(){
				for(let i=0 ;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY >= height1 && this.scroll < height2)){
						return i;
					}
				}
				return 0;
			}
		},
		created(){
			this.classMap = ['decrease','discount','guarantee','invoice','special'];

			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if(response.errno == ERR_OK){
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					})
				}
			})
		},
		methods: {
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{});

				this.foodScroll = new BScroll(this.$refs.foodWrapper,{
					probeType: 3
				});
				this.foodScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight(){
				let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook");
				let height = 0;
				this.listHeight.push(height);
				for(let i=0 ; i<foodList.length;i++){
					let item = foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
			}
		}
	}
</script>

<style lang="scss"> 
	@import '../../common/scss/mixin.scss';

	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow:hidden;
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background-color: #f3f5f7;
			.menu-item{
				display: table;
				padding: 0 12px;
				height: 54px;
				width:56px;
				line-height: 14px;
				@include border-1px(rgba(7,17,27,.1));
				&.current{
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background: #fff;
					font-weight: 700;
					.text{
						@include border-none(rgba(7,17,27,.1));
					}
				}
				.icon{
					display:inline-block;
					margin-right:2px;
					width:12px;
					height:12px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease{
						@include bg-images('decrease_3');
					}
					&.discount{
						@include bg-images('discount_3');
					}
					&.guarantee{
						@include bg-images('guarantee_3');
					}
					&.invoice{
						@include bg-images('invoice_3');
					}
					&.special{
						@include bg-images('special_3');
					}
				}
				.text{
					display: table-cell;
					width: 56px;
					vertical-align:middle;
					font-size: 12px;
				}
			}
		}

		.foods-wrapper{
			flex:1;
			.title{
				padding-left:14px;
				height:26px;
				line-height:26px;
				border-left:2px solid #d9dde1;
				font-size:12px;
				color:rgb(147,153,159);
				background-color: #f3f5f7;
			}
			.food-item{
				display:flex;
				margin:18px;
				padding-bottom:18px;
				@include border-1px(rgba(7,17,27,.1));
				&:last-child{
					@include border-none(rgba(7,17,27,.1))
					padding-bottom:0;
				}
				.icon{
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content{
					flex: 1;
					.name{
						margin: 2px 0 8px 0;
						height:14px;
						font-size: 14px;
						line-height:14px;
						color:rgb(7,17,27);
					}
					.desc,.extra{
						line-height: 10px;
						font-size: 10px;
						color:rgb(147, 153, 159);
					}
					.desc{
						margin-bottom: 8px;
					}
					.extra{
						line-height:10px;
						.count{
							margin-right:12px;
						}
					}
					.price{
						font-weight: 700;
						line-height: 24px;
						.now{
							margin-right: 8px;
							font-size: 14px;
							color:rgb(240,20,20);
						}
						.oldPrice{
							font-size: 10px;
							color:rgb(147, 153, 159);
							text-decoration: line-through;
						}
					}
				}
			}
		}
	}
</style>