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
    			<span class="icon"></span>
    			<span class="text">{{ seller.supports[0].description}}</span>
    		</div>
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
		}
	}
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.header{
		color:#fff;
		background:#000;
		.content-wrapper{
			padding: 24px 12px 18px 24px;
			font-size:0;
			.avatar{
				display:inline-block;
				border-radius:4px;
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
		}
	}
</style>