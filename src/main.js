import Vue from 'vue'
import App from './App.vue'
import csiiPlugins from 'csii-plugins'

Vue.config.productionTip = false
Vue.use(csiiPlugins)

new Vue({
  render: h => h(App),
}).$mount('#app')
