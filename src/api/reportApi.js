import { apiClient } from "./apiClient"

export const getUserTasks = () => apiClient.get("/reports/tasks")

export const getReportesGlobales = (params) =>
  apiClient.get("/reports/sales/global", { params })

export const getReportsSalesAgent = (params) =>
  apiClient.get("/reports/sales/agent", { params })
