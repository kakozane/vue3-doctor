/**
 * 为项目全局组件声明类型 这样代码提示方便
 */
import CpNavBar from '@/components/cp-nav-bar.vue'
import CpIcon from '@/components/cp-icon.vue'
import CpRadioBtn from '@/components/cp-radio-btn.vue'
import CpPaySheet from '@/components/cp-pay-sheet.vue'
declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
    CpRadioBtn: typeof CpRadioBtn
  }
}
