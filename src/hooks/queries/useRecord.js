import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export const useCreateRecord = (options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => {
      const payload = {
        ...data,
        record_type: "prospect",
      }
      return recordApi.createProspectRecord(payload)
    },
    onSuccess: (data, variables, context) => {
      // Optionally invalidate or refetch
      queryClient.invalidateQueries(["recordsByUser"])
      queryClient.invalidateQueries(["recordsByCriteria"])

      // Call any custom success logic
      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}
