import { useQuery } from "@tanstack/react-query"
import * as orderApi from "@/api/orderApi"
import { toURLSearchParams } from "@/utils/utils"

export const useGetOrdersByRecord = (params, options = {}) => {
  const searchParams = toURLSearchParams(params)
  return useQuery({
    queryKey: ["orders-by-record", params],
    queryFn: async () => {
      return await orderApi.getOrdersByRecord(searchParams)
    },
    ...options,
  })
}
