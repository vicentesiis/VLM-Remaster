import { apiClient } from "./apiClient"

export const getGroupByIdOrName = (params) =>
  apiClient.get(`/groups/group?${params.toString()}`)

export const getAllGroups = () => apiClient.get("/groups/all")

export const createGroup = (data) => apiClient.post("/groups/new", data)

export const assignGroupLeader = (data) =>
  apiClient.post("/groups/assign-leader", data)

export const reassignGroupLeader = (params) => {
  const searchParams = new URLSearchParams(params).toString()
  return apiClient.post(`/groups/reassign-leader?${searchParams}`)
}

export const assignAccountToGroup = (data) =>
  apiClient.post("/groups/assign-account", data)
