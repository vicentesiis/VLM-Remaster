import { apiClient } from "./apiClient"

export const getRecordById = (params) =>
  apiClient.get("/records/record", { params })

export const getRecordByTerm = (params) =>
  apiClient.get("/records/search", { params })

export const updateRecord = (data) => apiClient.put("/records/record", data)

export const getRecordsByCriteria = (params) =>
  apiClient.get(`/records/records?${params.toString()}`)

export const getRecordsByUser = (params) =>
  apiClient.get(`/records/records_by_user?${params.toString()}`)

export const getRecordByOrder = (params) =>
  apiClient.get("/records/record_by_order", { params })

export const createLeadRecord = (data) =>
  apiClient.post("/records/record/lead", data)

export const createProspectRecord = (data) =>
  apiClient.post("/records/record/prospect", data)

export const assignLeadRecordToUser = (data) =>
  apiClient.post("/records/record/lead/assign", data)

export const updateRecordStatus = ({ searchable_id, new_status }) =>
  apiClient.patch("/records/record/status", null, {
    params: {
      searchable_id,
      new_status,
    },
  })

export const reassignRecord = ({ record_id, user_id }) => {
  return apiClient.patch("/records/record/user", null, {
    params: {
      record_id,
      user_id,
    },
  })
}
