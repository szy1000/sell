<template>
	<div class="ratings">
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
		</div>
	</div>
</template>

<script>
  import star from '../../components/star/star'


	export default {
		props:{
			seller:{
				type: Object
			}
		},
		components:{
			star
		}
	}
</script>

<style lang="scss"> 
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
	}
</style>