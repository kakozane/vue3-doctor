<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'
import type { KnowledgeList, KnowledgeParams, KnowledgeType } from '@/types/consult'
import { getKnowledgePage } from '@/api/consult'

//  接收类型
const props = defineProps<{
  type: KnowledgeType
}>()

// 加载中状态 //会多次触发  false加载完成 关闭loading效果
const loading = ref(false)
// 是否完全加载完毕数据 false:还有数据  true：数据加载完了
const finished = ref(false)
// 列表的数据
const list = ref<KnowledgeList>([])
// 查询参数
const params = ref<KnowledgeParams>({
  type: props.type, // 频道类型
  current: 1, //请求页码
  pageSize: 5, //每页多少数据
})
// 滚动到底部会继续加载 默认加载一次
const onLoad = async () => {
  const res = await getKnowledgePage(params.value)
  // 把数据追加列表中
  list.value.push(...res.data.rows)
  // 判断已经加载完成了 list长度等于 ==== total数据总条数  当前页数=== pageTotal总页数
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    // 没有加载完
    params.value.current++
  }
  // 加载状态结束
  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 列表数据 -->
      <knowledge-card v-for="item in list" :key="item.id" :item="item"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
