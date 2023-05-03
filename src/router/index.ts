import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
