/**
 * 为项目全局组件声明类型 这样代码提示方便
 */
import CpNavBar from '@/components/cp-nav-bar.vue'
import CpIcon from '@/components/cp-icon.vue'
declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
  }
}
