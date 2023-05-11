import { createApp } from 'vue'
import pinia from '@/stores/index'
import App from './App.vue'
import router from '@/router/index'
import '@/styles/main.scss'
// vant需要单独引入的样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
// 注册SVG图标
import 'virtual:svg-icons-register'
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
