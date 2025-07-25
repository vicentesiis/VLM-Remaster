import { useMutation, useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import * as groupApi from "@/api/groupApi"
import { toURLSearchParams } from "@/utils"

export const useGetGroups = (options = {}) => {
  return useQuery({
    queryKey: ["groups", "Super Admin"],
    queryFn: () => groupApi.getAllGroups(),
    ...options,
  })
}

export const useGetGroupById = (params, options = {}) => {
  const hasValidParams = !!params?.group_searchable_id

  return useQuery({
    queryKey: ["group", params?.group_searchable_id],
    queryFn: () => {
      if (!hasValidParams) return Promise.resolve(null)
      const searchParams = toURLSearchParams(params)
      return groupApi.getGroupByIdOrName(searchParams)
    },
    enabled: hasValidParams && (options.enabled ?? true),
    ...options,
  })
}

export const useReassignGroupLeader = (options = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: groupApi.reassignGroupLeader,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["group"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}

export const useCreateGroup = (options = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: groupApi.createGroup,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["group"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}

export const UseUpdateGroupPhone = (options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: groupApi.UpdateGroupPhone,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["group"])
      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}  
