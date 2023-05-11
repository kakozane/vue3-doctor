import type {
  ConsultOrderItem,
  ConsultOrderListParams,
  ConsultOrderPage,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  DoctorPage,
  FollowType,
  Image,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  PartialConsult,
  TopDep,
} from '@/types/consult'
import { request } from '@/utils/request'

// 获取健康知识列表
export const getKnowledgePage = (params: KnowledgeParams) => request<KnowledgePage>('patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) => request<DoctorPage>('home/page/doc', 'GET', params)

export const followOrUnfollow = (id: string, type: FollowType = 'doc') => request('like', 'POST', { id, type })

export const getAllDep = () => request<TopDep[]>('dep/all')

export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('upload', 'POST', fd)
}

export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('patient/consult/order/pre', 'GET', params)

// 创建订单
export const createConsultOrder = (data: PartialConsult) => request<{ id: string }>('patient/consult/order', 'POST', data)

// 获取支付地址 0是微信  1是支付宝
export const getConsultOrderPayUrl = (params: { paymentMethod: 0 | 1; orderId: string; payCallback: string }) =>
  request<{ payUrl: string }>('patient/consult/pay', 'POST', params)

// 获取订单详情
export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('patient/consult/order/detail', 'GET', { orderId })

// 查看处方
export const getPrescriptionPic = (id: string) => request<{ url: string }>(`patient/consult/prescription/${id}`)

export const evaluateConsultOrder = (data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => request('patient/order/evaluate', 'POST', data)

// 获取问诊订单记录列表
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('patient/consult/order/list', 'GET', params)

export const cancelOrder = (id: string) => request(`patient/order/cancel/${id}`, 'PUT')

export const deleteOrder = (id: string) => request(`patient/order/${id}`, 'DELETE')
