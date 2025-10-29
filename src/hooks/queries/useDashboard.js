import { useQuery } from "@tanstack/react-query"
import * as dashboardApi from "@/api/dashboardApi"

export const useDashboardStats = (options = {}) =>
  useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardApi.getDashboardStats,
    ...options,
  })