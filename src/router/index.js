import Vue from 'vue'
import VueRouter from 'vue-router'
import UploadView from '../views/UploadView.vue'
import ComparingView from '../views/ComparingView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'upload',
    component: UploadView
  },
  {
    path: '/comapring',
    name: 'comparing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ComparingView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
