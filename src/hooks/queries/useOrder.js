import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export const useCreateOrder = (options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => {
      return orderApi.createOrder(data)
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["record-by-id"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}

export const useGetOrderById = (params, options = {}) => {
  const searchParams = toURLSearchParams(params)
  return useQuery({
    queryKey: ["orders-by-id", params],
    queryFn: async () => {
      return await orderApi.getOrderById(searchParams)
    },
    ...options,
  })
}
