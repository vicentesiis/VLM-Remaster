import { apiClient } from "./apiClient"

export const getGroupByIdOrName = (params) =>
  apiClient.get(`/groups/group?${params.toString()}`)

export const getAllGroups = () => apiClient.get("/groups/all?with_members=true")

export const createGroup = (data) => apiClient.post("/groups/new", data)

export const assignGroupLeader = (data) =>
  apiClient.post("/groups/assign-leader", data)

export const reassignGroupLeader = (params) => {
  const searchParams = new URLSearchParams(params).toString()
  return apiClient.post(`/groups/reassign-leader?${searchParams}`)
}

export const assignAccountToGroup = (data) =>
  apiClient.post("/groups/assign-account", data)

export const UpdateGroupPhone = ({ group_id, new_phone }) =>
  apiClient.patch("/groups/group/update_phone", null, {
    params: {
      group_id,
      new_phone,
    },
  })
