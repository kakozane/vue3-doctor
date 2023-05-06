<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
// 父传子
defineProps<{
  title: string
  rightText?: string
}>()
const onClickLeft = () => {
  // TODO 点击左侧返回按钮
  if (history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
// 子传父
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
</script>

<template>
  <van-nav-bar
    fixed
    :left-arrow="true"
    :title="title"
    :rightText="rightText"
    @click-left="onClickLeft"
    @click-right="emit('click-right')"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
