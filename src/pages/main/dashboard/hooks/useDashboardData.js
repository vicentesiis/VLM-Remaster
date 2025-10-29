import { useDashboardStats } from "@/hooks/queries"

export function useDashboardData() {
  const {
    data: response,
    isLoading,
    isFetching,
    isFetched,
    isError,
    refetch,
  } = useDashboardStats()

  const dashboardData = response?.data ?? null

  return {
    dashboardData,
    isLoading,
    isError,
    isFetching,
    isFetched,
    refetch,
  }
}