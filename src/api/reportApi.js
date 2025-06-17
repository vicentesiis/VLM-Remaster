import { apiClient } from "./apiClient"

export const getUserTasks = () => apiClient.get("/reports/tasks")

export const getReportesGlobales = ({ year, group, channel }) =>
    apiClient.get("/reports/sales/global", {
      params: {
        year,
        group_id: group,
        channel,
      },
    })