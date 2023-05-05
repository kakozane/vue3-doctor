import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  document.title = `津医问诊-${to.meta.title || '页面没有标题'}`
  const store = useUserStore()
  if (!store.user.token && !['login', '/other'].includes(to.path)) return '/login'
})
export default router
