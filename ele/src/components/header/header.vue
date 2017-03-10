<template>
	<div class="header">
    <div class="content-wrapper">
    	<div class="avatar">
    		<img width="64" height="64" v-bind:src="seller.avatar" alt="">
    	</div>
    	<div class="content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name">{{ seller.name }}</span>
    		</div>
    		<div class="description">
    			{{seller.description}}/{{seller.deliveryTime}}分钟送达
    		</div>
    		<div v-if="seller.supports" class="support">
    			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
    			<span class="text">{{ seller.supports[0].description}}</span>
    		</div>
    	</div>
    	<div v-if="seller.supports" class="supports-count">
    		<span class="count">{{seller.supports.length}}个</span>
    		<i class="iconfont icon-keyboard_arrow_right"></i>
    	</div>
    </div>
    <div class="bullentin-wrapper">
    	
    </div>
  </div>
</template>

<script>
	export default{
		props:{
			seller:{
				type: Object
			}
		},
		created() {
			this.classMap = ['decrease','discount','guarantee','invoice','special']
		}
	}
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.header{
		color:#fff;
		background:#000;
		.content-wrapper{
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size:0;
			.avatar{
				display:inline-block;
				border-radius:2px;
				vertical-align:top;
				overflow:hidden;
			}
		}
		.content{
			display:inline-block;
			margin-left: 16px;
			font-size: 14px;
			.title{
				margin: 2px 0 8px 0;
			}
			.brand{
				display:inline-block;
				width: 30px;
				height: 18px;
				vertical-align: top;
				@include bg-images('brand');
				background-size: 30px 10px;
				background-repeat: no-repeat;
				background-size: cover;
			}
			.name{
				font-size: 16px;
				font-weight:bold;
				line-height:18px;
			}
			.description{
				margin-bottom:10px;
				line-height:12px;
				font-size:12px
			}
			.support{
				.icon{
					display:inline-block;
					margin-right:4px;
					width:12px;
					height:12px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease{
						@include bg-images('decrease_1');
					}
					&.discount{
						@include bg-images('discount_1');
					}
					&.guarantee{
						@include bg-images('guarantee_1');
					}
					&.invoice{
						@include bg-images('invoice_1');
					}
					&.special{
						@include bg-images('special_1');
					}
				}
				.text{
					line-height:12px;
					font-size: 10px;
					vertical-align:top;
				}
			}
		}

		.supports-count{
			position: absolute;
			right:12px;
			bottom:14px;
			padding:0 8px;
			line-height:24px;
			border-radius:14px;
			background:rgba( 255, 255, 255, 0.2);
			text-align:center;
			.count{
				vertical-align:top;
				font-size:10px;
			}
			.icon-keyboard_arrow_right{
				margin-left:2px;
				line-height:24px;
				font-size:10px;
			}
		}
	}
</style>