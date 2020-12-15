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
// 引入rem适配
import setHtmlFontSize from './rem-config/remComfig'

Vue.prototype.localStorage = localStorage;
Vue.prototype.staticVariable = staticVariable;
Vue.prototype.gmtds = globalMedthods;
Vue.config.productionTip = false;
Vue.use(csiiPlugins); //引入第三方组件
Vue.use(Router); // 引入路由
// 设置rem
window.onresize = setHtmlFontSize;
setHtmlFontSize();


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
