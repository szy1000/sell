<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text">
						<span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">
			
		</div>
	</div>
</template>

<script>
	const ERR_OK = 0;

	export default {
		props:{
			seller:{
				type: Object
			}
		},
		data(){
			return {
				goods:[]
			}
		},
		created(){
			this.classMap = ['decrease','discount','guarantee','invoice','special'];

			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if(response.errno == ERR_OK){
					this.goods = response.data;
				}
			})
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

		}
	}
</style>