<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
				<i class="iconfont icon-remove_circle_outline"></i>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">
		{{food.count}}
		</div>
		<div class="cart-increase" @click="addCart($event)">
			<i class="iconfont icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
	  props:{
	  	food:{
	  		type:Object
	  	}
	  },
	  created(){
	  	// console.log(this.food);
	  },
	  methods:{
	  	addCart(event){
	  		if(!event._constructed){
	  			return;
	  		}
	  		if(!this.food.count){
	  			Vue.set(this.food,'count',1);
	  		}else{
	  			this.food.count++;
	  		}
	  		this.$emit('cart.add',event.target);
	  	},
	  	decreaseCart(event){
	  		if(!event._constructed){
	  			return;
	  		}
	  		if(this.food.count){
	  			this.food.count--;
	  		}
	  	}
	  }
	}
</script>

<style lang="scss" scoped> 
	.cartcontrol{
		font-size:0;
		.cart-decrease ,.cart-increase{
			display:inline-block;
			padding: 6px;
			line-height:24px;
			font-size:24px;
			color:rgb(0,160,220);
		}
		.move-enter-active, .move-leave-active{
			transition: all 0.5s linear;
			transform: translate3D(0,0,0) rotate(0deg);
		}
		.move-enter,.move-leave-active{
			transform: translate3D(24px,0,0) rotate(180deg);
			opacity:0;
		}
		.cart-count{
			display:inline-block;
			vertical-align:top;
			width:12px;
			padding-top:6px;
			line-height:24px;
			text-align:center;
			font-size:10px;
		}
		.cart-decrease{

		}
		.cart-increase{

		}
	}
</style>