<script setup lang="ts">
const clickRight = () => {
  console.log('点击了右边')
}
</script>

<template>
  <div class="login">
    <cp-nav-bar middle="登录" right="注册" @click-right="clickRight"></cp-nav-bar>
  </div>
</template>

<style lang="scss" scoped></style>
