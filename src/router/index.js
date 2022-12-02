import Vue from 'vue'
import VueRouter from 'vue-router'
import UploadView from '../views/UploadView.vue'
import ComparingView from '../views/ComparingView.vue'
import ResultView from '../views/ResultView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'upload',
    component: UploadView
  },
  {
    path: '/comparing',
    name: 'comparing',
    component: ComparingView
  },
  {
    path: '/result',
    name: 'result',
    component: ResultView
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
