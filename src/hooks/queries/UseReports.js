import { useQuery } from "@tanstack/react-query"
import * as ReportApi from "@/api/reportApi"

export const useGetVentasGlobales = ({ year, group, channel }, options = {}) => {
    return useQuery({
        queryKey: ["globalSales", year, group, channel],
        queryFn: async () => {  
          const res = await ReportApi.getReportesGlobales({ year, group, channel })
          return res.data // solo el objeto con los meses
        },
        enabled: !!year && !!group,
        ...options,
      })
    }