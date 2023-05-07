import { sendMobileCode } from '@/api/user'
import { ref, onUnmounted } from 'vue'
import { showSuccessToast, type FormInstance } from 'vant'
// 发送验证码功能
export function useSendCode(mobile: string) {
  const code = ref('')
  const time = ref(0)
  const form = ref<FormInstance>() // 获取表单实例
  let timeId: number // 倒计时定时器ID
  const send = async () => {
    // 已经倒计时time的值大于0，此时不能发送验证码
    if (time.value > 0) return
    // 验证不通过报错，阻止程序继续执行
    await form.value?.validate('mobile')
    const res = await sendMobileCode(mobile, 'login')
    showSuccessToast('发送成功')
    console.log(res.data)
    // 倒计时开始
    time.value = 60
    // 倒计时
    clearInterval(timeId)
    timeId = window.setInterval(() => {
      time.value--
      if (time.value <= 0) window.clearInterval(timeId)
    }, 1000)
  }
  onUnmounted(() => {
    window.clearInterval(timeId)
  })

  return {
    code,
    time,
    form,
    send,
  }
}
