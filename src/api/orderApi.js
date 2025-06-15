import { apiClient } from "./apiClient"

export const getOrderById = (id) =>
  apiClient.get(`/orders/order/id`, { params: { id } })

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

export const createOrder = (data) => apiClient.post("/orders/order", data)

export const handleOrderWebhook = (data) =>
  apiClient.post("/orders/order/events", data)
