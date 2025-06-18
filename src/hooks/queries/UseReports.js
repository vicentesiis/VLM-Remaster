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