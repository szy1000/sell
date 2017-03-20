<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo">
						<i class="iconfont icon-shopping_cart"></i>
					</div>
				</div>
				<!-- <div class="price">{{totalPrice}}元</div> -->
				<div class="price">0元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay">
					￥{{minPrice}}元起送
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
  	props:{
  		selectFoods: {
  			type: Array,
  			default() {
  				return [{
  					price:10,
  					count: 1
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
  		}
  	},
  	computed:{
  		totalPrice(){
  			let total = 0;
  			this.selectFoods.foreach((food) => {
  				total += food.price * food.count; 
  			});
  			return total;
  		}
  	}
  }
</script>

<style lang="scss" scoped>
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index:99;
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
				.icon-shopping_cart{
					line-height: 44px;
					font-size:24px;
					color: #808558;
				}
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
				background-color: #2b333b;
			}
		}
	}
</style>
