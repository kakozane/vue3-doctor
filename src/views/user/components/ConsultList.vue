<script setup lang="ts">
import type { ConsultType } from '@/enums'
import ConsultItem from './ConsultItem.vue'
import { ref } from 'vue'
import type { ConsultOrderItem, ConsultOrderListParams } from '@/types/consult'
import { getConsultOrderList } from '@/api/consult'

const props = defineProps<{
  // 类型
  type: ConsultType
}>()
const params = ref<ConsultOrderListParams>({
  type: props.type,
  current: 1, //当前请求第几页 默认第一页
  pageSize: 5, // 每页多少条数据
})

// 获取订单列表实现上拉加载更多
// 列表加载状态:true 显示加载中loading|false关闭loading
const loading = ref(false)
// 是否加载完成
const finished = ref(false)
// 列表数据 空数组
const list = ref<ConsultOrderItem[]>([])
// 加载方法  默认会执行一次
const onLoad = async () => {
  // 异步更新数据
  const res = await getConsultOrderList(params.value)
  // 追加当前页数据到列表
  list.value.push(...res.data.rows)
  if (params.value.current < res.data.pageTotal) {
    params.value.current++
  } else {
    // 数据加载完成
    finished.value = true
  }
  // 加载状态结束
  loading.value = false
}

// 删除订单
const onDelete = (id: string) => {
  list.value = list.value.filter((item) => item.id !== id)
  // 如果删除订单后没有数据了
  if (!list.value.length) onLoad()
}
</script>

<template>
  <div class="consult-list">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 循环渲染问诊订单数据 -->
      <consult-item @on-delete="onDelete" v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
