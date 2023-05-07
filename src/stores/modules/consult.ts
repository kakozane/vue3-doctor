import type { ConsultType } from '@/enums'
import type { ConsultIllness, PartialConsult } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    // 问诊信息
    const consult = ref<PartialConsult>({})
    // 记录问诊类型 极速问诊
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 记录问诊级别 0是普通 1是三甲
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 记录科室
    const setDep = (depId: string) => (consult.value.depId = depId)
    // 记录病情描述
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 家庭档案 记录选择的患者ID
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 记录优惠券
    const setCoupon = (id: string) => (consult.value.couponId = id)
    // 清理数据
    const clear = () => (consult.value = {})
    return {
      consult,
      setType,
      setIllnessType,
      setDep,
      setIllness,
      setPatient,
      setCoupon,
      clear,
    }
  },
  {
    persist: true,
  }
)
