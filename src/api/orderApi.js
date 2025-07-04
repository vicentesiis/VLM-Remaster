import { apiClient } from "./apiClient"

export const getOrderById = (params) =>
  apiClient.get(`/orders/order/id?${params.toString()}`)

export const getOrderByProviderId = (id) =>
  apiClient.get(`/orders/order/provider-id`, { params: { id } })

export const getOrderByReference = (ref) =>
  apiClient.get(`/orders/order/reference`, { params: { ref } })

export const getOrdersByUser = (params) =>
  apiClient.get("/orders/by-user", { params })

export const getOrdersByRecord = (params) =>
  apiClient.get(`/orders/by-record?${params.toString()}`)

export const getOrdersByGroup = (params) =>
  apiClient.get("/orders/by-group", { params })

export const createOrder = (data) => {
  const params = new URLSearchParams(data)
  return apiClient.post(`/orders/order?${params.toString()}`)
}

export const handleOrderWebhook = (data) =>
  apiClient.post("/orders/order/events", data)

export const getOrderBySearch = (params) =>
  apiClient.get(`/orders/order/search`, { params })
