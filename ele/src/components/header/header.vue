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
    	<div v-if="seller.supports" class="supports-count" @click="showDetail">
    		<span class="count">{{seller.supports.length}}个</span>
    		<i class="iconfont icon-keyboard_arrow_right"></i>
    	</div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
    	<span class="bulletin-title"></span>
    	<span class="bulletin-text">{{seller.bulletin}}</span>
    	<i class="iconfont icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
    	<img :src="seller.avatar" alt="">
    </div>

    <div v-show="detailShow" class="detail">
    	<div class="detail-wrapper clearfix">
    		<div class="detail-main">
    			<h1 class="name">{{seller.name}}</h1>
    			<div class="star-wrapper">
    				<star :size="48" :score="seller.score"></star>
    			</div>
    		</div>
    	</div>
    	<div class="detail-close">
    		<i class="iconfont icon-close" @click="closeDtail"></i>
    	</div>
    </div>
  </div>
</template>

<script>
  import star from '../../components/star/star'

	export default{
		props:{
			seller:{
				type: Object
			}
		},
		data(){
			return {
				detailShow: false,
			}
		},
		methods:{
			showDetail() {
				this.detailShow = true;
			},
			closeDtail() {
				this.detailShow = false;
			}
		},
		created() {
			this.classMap = ['decrease','discount','guarantee','invoice','special']
		},
		components: {
			star
		}
	}
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.header{
		position: relative;
		color:#fff;
		background-color: rgba(7,17,27,.5);
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
			border-radius:14px;
			background:rgba( 255, 255, 255, 0.2);
			text-align:center;
			.count{
				vertical-align:top;
				font-size:10px;
				line-height:24px;
			}
			.icon-keyboard_arrow_right{
				margin-left:2px;
				line-height:24px;
				font-size:10px;
			}
		}
		.bulletin-wrapper{
			position: relative;
			padding:0 22px 0 12px;
			width:100%;
			height:28px;
			line-height:28px;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
			box-sizing: border-box;
			background-color: rgba(7,17,27, 0.2);
			.bulletin-title{
				display:inline-block;
				margin-top:8px;
				width:22px;
				height:12px;
				font-size:10px;
				font-weight:200;
				@include bg-images("bulletin");
				background-size: cover;
			}
			.bulletin-text{
				vertical-align:top;
				margin: 0 4px;
				font-size:10px;
			}
			.icon-keyboard_arrow_right{
				position: absolute;
				top:8px;
				right:12px;
				font-size: 10px;
			}
		}
		.background{
			position: absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			overflow:hidden;
			z-index:-1;
			filter:blur(10px);
			img{
				width:100%;
			}
		}

		.detail{
			position: fixed;
			top:0;
			left:0;
			width:100%;
			height:100%;
			overflow:auto;
			z-index: 99;
			background-color:rgba(7,17,27,.8);
			.detail-wrapper{
				min-height:100%;
			}
			.detail-main{
				width:100%;
				margin-top:64px;
				padding-bottom:64px;
				text-align: center;
			}
			.name{
				font-size:16px;
				font-weight:700;
				line-height:16px;
				color:rgb(255, 255, 255);
			}
			.star-wrapper{
				margin-top:18px;
				padding:2px 0;
				text-align: center;
			}
		}
		.detail-close{
			margin-top: -64px;
			height:64px;
			line-height:64px;
			text-align:center;
			.icon-close{
				font-size: 32px;
				color: rgba(255,255,255,.5);
			}
		}
	}
</style>