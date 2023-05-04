<script setup lang="ts">
const clickRight = () => {
  console.log('点击了右边')
}
</script>

<template>
  <div class="login">
    <cp-nav-bar title="登录" rightText="注册" @click-right="clickRight"></cp-nav-bar>
  </div>
</template>

<style lang="scss" scoped></style>
