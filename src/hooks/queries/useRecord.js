import { useQuery } from "@tanstack/react-query"
import * as recordApi from "@/api/recordApi"

export const useGetRecords = (params, options = {}) =>
  useQuery({
    queryKey: ["records", params],
    queryFn: async () => {
      const res = await recordApi.getRecordsByCriteria(params)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate processing
      return res
    },
    ...options,
  })
