import { apiClient } from "./apiClient"

export const getDashboardStats = () => apiClient.get("/stats/dashboard")