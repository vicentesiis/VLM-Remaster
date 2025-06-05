import { apiClient } from "./apiClient"

export const getUserTasks = () => apiClient.get("/reports/tasks")
