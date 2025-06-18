import { useQuery } from "@tanstack/react-query"
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
