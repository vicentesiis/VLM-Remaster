import { useQuery } from "@tanstack/react-query"
import * as reportApi from "@/api/reportApi"

export const useGetVentasGlobales = (
  { year, group, channel },
  options = {}
) => {
  return useQuery({
    queryKey: ["globalSales", year, group, channel],
    queryFn: () =>
      reportApi
        .getReportesGlobales({
          year,
          group_id: group,
          channel,
        })
        .then((res) => res.data),
    enabled: !!year && !!group && !!channel,
    ...options,
  })
}

export const useGetTasks = (options = {}) => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      return await reportApi.getUserTasks()
    },
    ...options,
  })
}

export const useGetReportsSalesAgent = (params, options = {}) => {
  return useQuery({
    queryKey: ["sales-by-agent", params],
    queryFn: async () => {
      const res = await reportApi.getReportsSalesAgent(params)
      return res.data
    },
    ...options,
  })
}
