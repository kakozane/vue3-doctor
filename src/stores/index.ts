import { createPinia } from 'pinia'
// 持久化插件
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)
export default pinia

// 统一导出modules下仓库
export * from './modules/user'
export * from './modules/consult'
