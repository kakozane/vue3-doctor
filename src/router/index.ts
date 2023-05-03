import { createRouter, createWebHistory } from 'vue-router'
import Test from '@/views/test/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      component: Test
    }
  ]
})

export default router
