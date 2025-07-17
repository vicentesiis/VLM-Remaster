import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export const useGetRecordsByUser = (params, options = {}) => {
  const searchParams = toURLSearchParams(params)

  return useQuery({
    queryKey: ["records-by-user", params],
    queryFn: async () => {
      return await recordApi.getRecordsByUser(searchParams)
    },
    ...options,
  })
}

export const useGetRecordsByCriteria = (params, options = {}) => {
  const searchParams = toURLSearchParams(params)
  return useQuery({
    queryKey: ["records-by-criteria", params],
    queryFn: async () => {
      return await recordApi.getRecordsByCriteria(searchParams)
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
      queryClient.invalidateQueries(["records-by-user"])
      queryClient.invalidateQueries(["records-by-criteria"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}

export const useUpdateRecord = (options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: recordApi.updateRecord,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["records-by-user"])
      queryClient.invalidateQueries(["records-by-criteria"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}

export const useUpdateRecordStatus = (options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: recordApi.updateRecordStatus,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["records-by-user"])
      queryClient.invalidateQueries(["records-by-criteria"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}

export const useReassignRecord = (options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: recordApi.reassignRecord,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["records-by-user"])
      queryClient.invalidateQueries(["records-by-criteria"])
      queryClient.invalidateQueries(["record-by-id"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}

export const getRecordByIdQueryKey = (searchable_id) => [
  "record-by-id",
  searchable_id,
]
