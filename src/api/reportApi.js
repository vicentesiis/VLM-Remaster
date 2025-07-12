import { apiClient } from "./apiClient"

export const getUserTasks = () => apiClient.get("/reports/tasks")

export const getAgentRegistrations = (params) =>
  apiClient.get("/reports/registrations/agent", { params })

export const getGroupSalesReport = (params) =>
  apiClient.get("/reports/sales/group", { params })

export const getAgentCutOff = (params) =>
  apiClient.get("/reports/cut-off", { params })

export const getFinalizedReport = (params) =>
  apiClient.get("/reports/records/finalized", { params })

export const getAgentPotentialSales = (params) =>
  apiClient.get("/reports/sales/agent/potential", { params })

export const getActiveSalesReceivable = (params) =>
  apiClient.get("/reports/collections/user", { params })

export const getActiveSalesReceivableByGroup = (params) =>
  apiClient.get("/reports/collections/group", { params })

export const getMyPotentialSales = () =>
  apiClient.get("/reports/my-potential-sales")

export const getReportesGlobales = (params) =>
  apiClient.get("/reports/sales/global", { params })

export const getReportsSalesAgent = (params) =>
  apiClient.get("/reports/sales/agent", { params })

export const postAgentCutOff = (params) =>
  apiClient.post("/reports/cut-off", null, {
    params,
    responseType: "blob",
  })
