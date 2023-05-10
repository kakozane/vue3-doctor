<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import io, { Socket } from 'socket.io-client'
import { onMounted, onUnmounted } from 'vue'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { Message, TimeMessages } from '@/types/room'
import { MsgType, OrderType } from '@/enums'
import { ref, nextTick, provide } from 'vue'
import type { ConsultOrderItem, Image } from '@/types/consult'
import { getConsultOrderDetail } from '@/api/consult'
import dayjs from 'dayjs'
import { showToast } from 'vant'

const consult = ref<ConsultOrderItem>()
const loadConsult = async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = res.data
}

// 提供问诊订单数据给后代组件
provide('consult', consult)
const completeEva = (score: number) => {
  const item = list.value.find((item) => item.msgType === MsgType.CardEvaForm)
  if (item) {
    item.msg.evaluateDoc = { score }
    item.msgType = MsgType.CardEva
  }
}
provide('completeEva', completeEva)

const store = useUserStore()
const route = useRoute()
// 消息内容
const list = ref<Message[]>([])
const initialMsg = ref(true)
// 初始化创建ws长连接 （打电话）
// 通过io函数传入后台ws连接地址和相关参数
// 连接成功后的相关事件
// 通过io实例的connect 监听连接是否成功
// 通过error事件 监听连接错误
// 通过disconnect 监听连接断开
// 存储socket实例
let socket: Socket
onMounted(() => {
  loadConsult()
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`,
    },
    query: {
      orderId: route.query.orderId,
    },
  })
  socket.on('connect', () => {
    console.log('连接成功')
  })
  socket.on('disconnect', () => {
    console.log('连接关闭')
  })
  socket.on('error', () => {
    console.log('发生错误')
  })

  // 获取聊天记录，如果是第一次（默认消息）
  // {data}：{data添加类型}
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    // data 数据 ===> [ {createTime}, ...items ]
    const arr: Message[] = []
    data.forEach((item, i) => {
      // 记录每一段消息中最早的消息时间，获取聊天记录需要使用
      if (i === 0) time.value = item.createTime
      // 发送消息的时间放入到result中
      arr.push({
        msgType: MsgType.Notify, // 决定使用哪个消息卡片去渲染
        msg: {
          content: item.createTime,
        },
        createTime: item.createTime,
        id: item.createTime,
      })
      // 把items的消息放入到results中
      arr.push(...item.items)
    })
    // 上面两步之后把处理好的消息列表追加到list中
    list.value.unshift(...arr)

    loading.value = false
    if (!arr.length) return showToast('没有更多聊天记录了')

    if (initialMsg.value) {
      socket.emit('updateMsgStatus', arr[arr.length - 1].id)
      // 第一次需要滚动到最新的消息
      nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
        initialMsg.value = false
      })
    }
  })
  // 监听订单状态变化
  socket.on('statusChange', () => loadConsult())
  // 接收聊天消息
  socket.on('receiveChatMsg', async (event) => {
    socket.emit('updateMsgStatus', event.id)
    list.value.push(event)
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })
})
onUnmounted(() => {
  socket.close()
})

// 发送文字信息
const onSendText = (text: string) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: {
      content: text,
    },
  })
}

// 发送图片信息
const onSendImage = (image: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: {
      picture: image,
    },
  })
}

// 下拉刷新
const loading = ref(false)
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const onRefresh = () => {
  socket.emit('getChatMsgList', 20, time.value, consult.value?.id)
}
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室"></cp-nav-bar>
    <!-- 状态栏 -->
    <room-status :status="consult?.status" :countdown="consult?.countdown"></room-status>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <!-- 消息 -->
      <room-message v-for="item in list" :key="item.id" :item="item"></room-message>
    </van-pull-refresh>
    <!-- 操作栏 -->
    <room-action
      @send-text="onSendText"
      @send-image="onSendImage"
      :disabled="consult?.status !== OrderType.ConsultChat"
    ></room-action>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
