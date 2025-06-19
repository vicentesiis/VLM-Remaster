import { useMutation, useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import * as groupApi from "@/api/groupApi"
import { toURLSearchParams } from "@/utils"

export const useGetGroups = (options = {}) => {
  return useQuery({
    queryKey: ["groups", "admin"],
    queryFn: () => groupApi.getAllGroups(),
    ...options,
  })
}

export const useGetGroupById = (params, options = {}) => {
  const searchParams = toURLSearchParams(params)
  return useQuery({
    queryKey: ["group", params],
    queryFn: () => groupApi.getGroupByIdOrName(searchParams),
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
