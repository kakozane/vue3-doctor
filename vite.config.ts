import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// 打包精灵图
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true, //防止响应式变量 解构后出现响应式失效
    }),
    Components({
      dts: false,
      resolvers: [VantResolver()],
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
