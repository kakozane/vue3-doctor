<script setup lang="ts">
import { ref } from 'vue'
import { mobileRules, passwordRules } from '@/utils/rules'
import { loginByPassword } from '@/api/user'
import { showFailToast } from 'vant'
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
  if (!agree.value) {
    return showFailToast('请勾选用户协议')
  }
  // console.log('successs')
  try {
    const res = await loginByPassword(mobile.value, password.value)
    console.log('登录成功', res.data)
    store.setUser(res.data)
    // 保证是字符串
    router.push((route.query.returnUrl as string) || '/user')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="login-page">
    <CpNavBar title="登录" rightText="注册" @click-right="$router.push('/register')"></CpNavBar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <VanIcon name="arrow"></VanIcon>
      </a>
    </div>
    <!-- 表单 -->
    <VanForm @submit="login" autocomplete="off">
      <VanField v-model="mobile" :rules="mobileRules" placeholder="请输入手机号" type="tel"></VanField>
      <VanField v-model="password" :rules="passwordRules" placeholder="请输入密码" :type="isShowPwd ? 'text' : 'password'">
        <template #button>
          <CpIcon @click="isShowPwd = !isShowPwd" :name="`login-eye-${isShowPwd ? 'on' : 'off'}`" />
        </template>
      </VanField>
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
