import Vue from 'vue'
import App from './App.vue'
import csiiPlugins from 'csii-plugins'
import Router from 'vue-router' 
// 引入路由
import router from './router/index'
// 引入vuex
import store from './store/store'
// 引入服务
// localStorage
import localStorage from './services/localStorage'
// log
import log from './services/log'
// 引入静态变量
import staticVariable from './staticVariable/staticVariable'
// 引入vue全局方法
import globalMedthods from './globalMedthods/globalMedthods'
// 引入rem适配
import setHtmlFontSize from './rem-config/remComfig'

// 建立中转站，实现组件与组件之间的传值
let bus = new Vue()
Vue.prototype.bus = bus

Vue.prototype.localStorage = localStorage;
Vue.prototype.log = log;
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
