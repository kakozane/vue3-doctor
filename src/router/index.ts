import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      { path: '/home', component: () => import('@/views/home/index.vue'), meta: { title: '首页' } },
      { path: '/article', component: () => import('@/views/article/index.vue'), meta: { title: '健康百科' } },
      { path: '/notify', component: () => import('@/views/notify/index.vue'), meta: { title: '消息通知' } },
      { path: '/user', component: () => import('@/views/user/index.vue'), meta: { title: '个人中心' } },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  document.title = `津医问诊-${to.meta.title}`
  const store = useUserStore()
  if (!store.user.token && !['login', '/other'].includes(to.path)) return '/login'
})
export default router
