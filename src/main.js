import Vue from 'vue'
import App from './App.vue'
import csiiPlugins from 'csii-plugins'
import Router from 'vue-router' 
// 引入路由
import router from './router/index'
// 引入vuex
import store from './store/store'
// 引入localStorage服务
import localStorage from './localstroage/localStorage'
// 引入静态变量
import staticVariable from './staticVariable/staticVariable'
// 引入vue全局方法
import globalMedthods from './globalMedthods/globalMedthods'

Vue.prototype.localStorage = localStorage;
Vue.prototype.staticVariable = staticVariable;
Vue.prototype.gmtds = globalMedthods;
Vue.config.productionTip = false;
Vue.use(csiiPlugins);
Vue.use(Router); // 引入路由

String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gmi"), s2);
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
