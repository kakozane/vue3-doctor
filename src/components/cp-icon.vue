<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
<template>
  <svg aria-hidden="true" class="icon">
    <!-- cion-文件夹名称-svg名称 -->
    <use :href="`#icon-${name}`" />
  </svg>
</template>
<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
}
</style>
