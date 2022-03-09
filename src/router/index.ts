import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'login'
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: () => import('@/views/home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
