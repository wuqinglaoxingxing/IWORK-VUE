import Vue from 'vue'
import App from './App.vue'
import csiiPlugins from 'csii-plugins'
import Router from 'vue-router' 
// 引入路由
import router from './router/index'
// 引入vuex
import store from './store/store'

import './assets/theme/violet.css'

Vue.config.productionTip = false
Vue.use(csiiPlugins)
Vue.use(Router) // 引入路由

String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gmi"), s2);
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
