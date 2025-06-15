import { useQuery } from "@tanstack/react-query"
import * as recordApi from "@/api/recordApi"
import { toURLSearchParams } from "@/utils/utils"

export const useGetRecordById = (searchable_id, options = {}) => {
  return useQuery({
    queryKey: ["record-by-id", searchable_id],
    queryFn: async () => {
      const res = await recordApi.getRecordById({ searchable_id })
      return res.data
    },
    enabled: !!searchable_id,
    ...options,
  })
}

export const useGetOrdersById = (params, options = {}) => {
  const searchParams = toURLSearchParams(params)
  return useQuery({
    queryKey: ["orders-by-record", params],
    queryFn: async () => {
      const res = await recordApi.getRecordById(searchParams)
      return res.data
    },
    ...options,
  })
}
