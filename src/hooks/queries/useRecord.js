import { useQuery } from "@tanstack/react-query"
import * as recordApi from "@/api/recordApi"

export const useGetRecordsByUser = (params, options = {}) => {
  return useQuery({
    queryKey: ["recordsByUser", params],
    queryFn: async () => {
      const res = await recordApi.getRecordsByUser(params)
      await new Promise((r) => setTimeout(r, 300))
      return res
    },
    ...options,
  })
}

export const useGetRecordsByCriteria = (params, options = {}) => {
  return useQuery({
    queryKey: ["recordsByCriteria", params],
    queryFn: async () => {
      const res = await recordApi.getRecordsByCriteria(params)
      await new Promise((r) => setTimeout(r, 300))
      return res
    },
    ...options,
  })
}
