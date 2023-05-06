<script setup lang="ts">
// 定义api
defineProps<{
  options: { label: string; value: number | string }[]
  modelValue: number | string // 选中的value值
}>()

// 自定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', data: number | string): void
}>()
</script>
<!-- 按钮组单选框组件 -->
<template>
  <div class="cp-radio-btn">
    <a
      class="item"
      v-for="(item, i) in options"
      @click="emit('update:modelValue', item.value)"
      :class="{ active: modelValue === item.value }"
      :key="i"
      href="javascript:;"
    >
      {{ item.label }}
    </a>
  </div>
</template>
<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    height: 32px;
    min-width: 70px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;
    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
