<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { loginByMobile, loginByPassword, sendMobileCode } from '@/api/user'
import { showToast, showFailToast, showSuccessToast, type FormInstance } from 'vant'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

// 是否同意网站协议
const agree = ref(false)
const clickRight = () => {}
// 手机号和密码 的响应变量
const mobile = ref('13230000001')
const password = ref('abc12345')

// 是否显示密码
const isShowPwd = ref(false)

// 登录功能
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const login = async () => {
  if (!agree.value) return showToast('请勾选我已同意')
  // 验证完毕，进行登录
  const res = isPass.value ? await loginByPassword(mobile.value, password.value) : await loginByMobile(mobile.value, code.value)
  store.setUser(res.data)
  // 如果有回跳地址就进行回跳，没有跳转到个人中心，replace目的 a => login  => b  变成 a => b
  router.replace((route.query.returnUrl as string) || '/user')
  showSuccessToast('登录成功')
}

// 发送验证码
const isPass = ref(true) // true
const code = ref('')
const time = ref(0)
const form = ref<FormInstance>() // 获取表单实例
let timeId: number // 倒计时定时器ID
const send = async () => {
  // 已经倒计时time的值大于0，此时不能发送验证码
  if (time.value > 0) return
  // 验证不通过报错，阻止程序继续执行
  await form.value?.validate('mobile')
  await sendMobileCode(mobile.value, 'login')
  showSuccessToast('发送成功')
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
</script>

<template>
  <div class="login-page">
    <CpNavBar title="登录" rightText="注册" @click-right="$router.push('/register')"></CpNavBar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">
          {{ isPass ? '短信验证码登录' : '密码登录' }}
        </span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <VanForm @submit="login" autocomplete="off" ref="form">
      <VanField v-model="mobile" name="mobile" :rules="mobileRules" placeholder="请输入手机号" type="tel"></VanField>
      <!--  密码输入框 -->
      <VanField
        v-if="isPass"
        v-model="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        :type="isShowPwd ? 'text' : 'password'"
      >
        <template #button>
          <CpIcon @click="isShowPwd = !isShowPwd" :name="`login-eye-${isShowPwd ? 'on' : 'off'}`" style="margin-right: 10px" />
        </template>
      </VanField>
      <!--  验证码输入 -->
      <van-field v-else :rules="codeRules" placeholder="短信验证码">
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="send">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <VanCheckbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </VanCheckbox>
      </div>
      <div class="cp-cell">
        <VanButton native-type="submit" block round type="primary">登 录</VanButton>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </VanForm>
    <!-- 底部 -->
    <!-- <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div> -->
    <!-- <svg aria-hidden="true">
      <use href="#icon-login-eye-off" />
    </svg> -->
    <CpIcon name="home-docs" />
    <CpIcon name="consult-alipay" />
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
