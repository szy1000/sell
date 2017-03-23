<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">
				{{desc.all}} 
				<span class="count">{{ratings.length}}</span>
			</span>
			<span class="block positive" :class="{'active':selectType===0}"  @click="select(0,$event)">
				{{desc.positive}} 
				<span class="count">{{positives.length}}</span>
			</span>
			<span class="block negative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negative}} 
				<span class="count">{{negatives.length}}</span></span>
		</div>
		<div class="switch" @click="toggleContent" :class="{'on':onlyContent}">
			<span class="icon icon-check_circle"></span>
			<span class="text">
			只看有内容的评论</span>
		</div>
	</div>
</template>

<script>

	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default {
	  props:{
	  	ratings:{
	  		type:Array,
	  		default(){
	  			return [];
	  		}
	  	},
	  	selectType:{
	  		type:Number,
	  		default:ALL
	  	},
	  	onlyContent:{
	  		type: Boolean,
	  		default: false
	  	},
	  	desc:{
	  		type:Object,
	  		default(){
	  			return{
	  				all:'全部',
	  				positive:'满意',
	  				negative:'不满意'
	  			}
	  		}
	  	},
	  },
  	methods:{
  		select(type,event){
  			if(!event._constructed){
  				return;
  			}
  			this.$emit('select',type)
  		},
  		toggleContent(event){
  			if(!event._constructed){
  				return;
  			}
  			this.$emit('toggle')
  		}
  	},
  	computed:{
  		positives(){
  			return this.ratings.filter((rating) => {
  				return rating.rateType === POSITIVE;
  			})
  		},
  		negatives(){
  			return this.ratings.filter((rating) => {
  				return rating.rateType === NEGATIVE;
  			})
  		}
  	},
	}
</script>

<style lang="scss"> 
	@import '../../common/scss/mixin.scss';

	.ratingselect{
		.rating-type{
			padding: 18px 0;
			margin: 0 18px;
			font-size: 0;
			@include border-1px(rgba(7,17,27,.1));
			.block{
				display:inline-block;
				margin-right:8px;
				padding: 8px 12px;
				font-size:12px;
				line-height:16px;
				border-radius:1px;
				color:rgb(77,85,93);
				&.actvie{
					color:#fff;
				}
				&.positive{
					background-color: rgba(0,160,220,.2);
					&.active{
						color:#fff;
						background-color: rgb(0,160,220);
					}
				}
				&.negative{
					background-color: rgba(77,85,93,.2);
					&.active{
						color:#fff;
						background-color: rgb(77,85,93);
					}
				}
				.count{
					margin-left: 2px;
					font-size: 8px;
				}
			}
		}
		.switch{
			padding:12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7,17,27,.1);
			color:$gray-base;
			font-size: 0;
			span{
				display:inline-block;
				vertical-align:top;
			}
			.icon{
				margin-right:4px;
				font-size:24px;
			}
			.text{
				font-size: 12px;
			}
			&.on{
				.icon{
					color:#00c850;
				}
			}
		}
	}
</style>