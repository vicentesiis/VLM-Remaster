import { useQuery } from "@tanstack/react-query"
import * as ReportApi from "@/api/reportApi"

export const useGetVentasGlobales = ({ year, group, channel }, options = {}) => {
  return useQuery({
    queryKey: ["globalSales", year, group, channel],
    queryFn: () =>
      ReportApi.getReportesGlobales({
        year,
        group_id: group,
        channel,
      }).then(res => res.data),
    enabled: !!year && !!group && !!channel,
    ...options,
  })
}
export const useGetAgentSales = ({user_id, start_date, end_date}, options = {}) => {
  return useQuery({
    queryKey: ["agentSalesReport", user_id, start_date, end_date],
    queryFn: () =>
      ReportApi.getAgentSales({
        user_id,
        start_date, 
        end_date
      }).then((res) => res.data),
      enabled: !!user_id && !!start_date && !!end_date,
      ...options,
  }) 
}
export const useGetAgentRegistrations = ({user_id, start_date, end_date, record_type}, options = {}) => {
  return useQuery({
    queryKey: ["agentRegistrationsReport", user_id, start_date, end_date, record_type],
    queryFn: () =>
      ReportApi.getAgentRegistrations({
        user_id,
        start_date, 
        end_date, 
        record_type,
      }).then((res) => res.data),
      enabled: !!user_id && !!start_date && !!end_date, record_type,
      ...options,
  }) 
}