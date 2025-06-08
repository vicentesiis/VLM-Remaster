import { apiClient } from "./apiClient"

export const getCurrentUser = (params = { with_group: true }) =>
  apiClient.get("/users/me", { params })
export const getUserById = (id) => apiClient.get(`/users/user/${id}`)
export const getUser = () => apiClient.get("/users/user")
export const createUser = (data) => apiClient.post("/users/user", data)
export const updateUser = (data) => apiClient.put("/users/user", data)
export const getUserWithRecords = () => apiClient.get("/users/user/records")
export const getUserWithGroup = () => apiClient.get("/users/user/group")
export const getUserWithOrders = () => apiClient.get("/users/user/orders")
export const getUsersByCriteria = (params) =>
  apiClient.get("/users/users", { params })
export const getUsersFromGroup = () => apiClient.get("/users/group")
export const getUserOfRecord = () => apiClient.get("/users/record")
export const getUserClients = () => apiClient.get("/users/user/clients")
export const setUserActiveState = (data) =>
  apiClient.post("/users/user/active", data)
export const setUserRecordWeight = (data) =>
  apiClient.post("/users/user/record_weight", data)
