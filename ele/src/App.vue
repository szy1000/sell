<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='/goods' exact>
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>
          商家
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  import {urlParse} from './common/js/util'
  import {store} from './common/js/store'
  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryPara = urlParse();
            return queryPara.id;
          })()
        }
      }
    },
    created() {
      this.$http.get('./api/seller?id='+this.seller.id).then( respose => {
        respose = respose.body;
        if(respose.errno === ERR_OK ){
          // this.seller = respose.data;
          this.seller = Object.assign({},this.seller,respose.data);
        }
      } , reject => {
        alert("error");
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="scss">
  @import './common/scss/mixin.scss';
 // @import './common/scss/common.scss';
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7,17,27,.1));
    .tab-item{
      flex: 1;
      text-align:center;
      &>a{
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
        &.active{
          color:rgb(240,20,20);
        }
      }
    }
  }
</style>