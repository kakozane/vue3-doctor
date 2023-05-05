import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      { path: '/home', component: () => import('@/views/home/index.vue') },
      { path: '/article', component: () => import('@/views/article/index.vue') },
      { path: '/notify', component: () => import('@/views/notify/index.vue') },
      { path: '/user', component: () => import('@/views/user/index.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  const store = useUserStore()
  if (!store.user.token && !['login', '/other'].includes(to.path)) return '/login'
})
export default router
