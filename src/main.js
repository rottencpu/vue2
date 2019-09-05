import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
// import 'amfe-flexible/index.js'
import '@/assets/styles/global.scss'
import router from './router'
import store from './store'
import './permission'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

