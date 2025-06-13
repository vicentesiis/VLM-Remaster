import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as recordApi from "@/api/recordApi"
import { toURLSearchParams } from "@/utils/utils"

export const useGetRecordById = (searchable_id, options = {}) => {
  return useQuery({
    queryKey: ["recordById", searchable_id],
    queryFn: async () => {
      const res = await recordApi.getRecordById({ searchable_id })
      return res.data
    },
    enabled: !!searchable_id,
    ...options,
  })
}

export const useGetRecordsByUser = (params, options = {}) => {
  const searchParams = toURLSearchParams(params)

  return useQuery({
    queryKey: ["records-by-user", params],
    queryFn: async () => {
      const res = await recordApi.getRecordsByUser(searchParams)
      await new Promise((r) => setTimeout(r, 300))
      return res
    },
    ...options,
  })
}

export const useGetRecordsByCriteria = (params, options = {}) => {
  console.log("useGetRecordsByCriteria", params)
  const searchParams = toURLSearchParams(params)
  return useQuery({
    queryKey: ["recordsByCriteria", params],
    queryFn: async () => {
      const res = await recordApi.getRecordsByCriteria(searchParams)
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
