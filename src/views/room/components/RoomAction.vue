<script setup lang="ts">
import { uploadImage } from '@/api/consult'
import type { Image } from '@/types/consult'
import { showLoadingToast } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { ref } from 'vue'
// 聊天框
defineProps<{
  disabled: boolean
}>()

// 发送文字消息
const text = ref('')
const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-image', image: Image): void
}>()
// 发送给父组件 父组件使用socket.emit把文字发送给ws服务器 再下发聊天内容发给医生
const sendText = () => {
  emit('send-text', text.value)
  text.value = ''
}

// 提交图片
const sendImage: UploaderAfterRead = async (item) => {
  if (Array.isArray(item)) return
  if (!item.file) return
  const t = showLoadingToast({ message: '正在上传', duration: 0 })
  const res = await uploadImage(item.file)
  t.close()
  emit('send-image', res.data)
}
</script>

<template>
  <div class="room-action">
    <!-- 输入框 发送文字消息 -->
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      :disabled="disabled"
      v-model="text"
      @keyup.enter="sendText"
    ></van-field>
    <!-- 上传图片 发送图片消息 -->
    <van-uploader :after-read="sendImage" :preview-image="false" :disabled="disabled">
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
