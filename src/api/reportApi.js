import { apiClient } from "./apiClient"

export const getUserTasks = () => apiClient.get("/reports/tasks")

export const getReportesGlobales = (params) => apiClient.get("/reports/sales/global", { params })

export const getAgentSales = (params) => apiClient.get("/reports/sales/agent", {params})

export const getAgentRegistrations = (params) => apiClient.get("/reports/registrations/agent", {params})

export const getGroupSalesReport = (params) => apiClient.get("/reports/sales/group", {params})