import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import NProgress from 'nprogress';
import VueWorker from 'vue-worker';
import  '../node_modules/nprogress/nprogress.css'
Vue.config.productionTip = false

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueWorker);
