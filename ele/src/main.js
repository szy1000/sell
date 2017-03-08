// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
// import router from './router'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

import './common/scss/common.scss'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
 	{ path: '/', redirect: '/goods'},
 	{ path: '/goods', component: goods },
  { path: '/seller', component: seller },
  { path: '/ratings', component: ratings },
]

const router = new VueRouter({
  routes,
  linkActiveClass:'active',
})

const app = new Vue({
	el: '#app',
  router:router,
  template: '<App/>',
  components: { App }
}).$mount('#app')


// this.$router.go('/seller')

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })