import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'
export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 空对象变量用as断言指定类型
    const user = ref({} as User)

    // 存储用户信息=>登陆成功
    const setUser = (userData: User) => {
      user.value = userData
    }
    // 删除用户信息=》退出登录
    const delUser = () => {
      user.value = {} as User
    }
    return {
      user,
      setUser,
      delUser
    }
  },
  {
    // 开启本模块数据持久化
    // persist: true
    persist: {
      // 自定义key的名字
      key: 'user',
      // 指定哪些变量持久化
      paths: ['user']
    }
  }
)
