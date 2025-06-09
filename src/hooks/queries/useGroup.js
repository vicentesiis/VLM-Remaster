import { useQuery } from "@tanstack/react-query"
import * as groupApi from "@/api/groupApi"

export const useGetGroups = (options = {}) => {
  return useQuery({
    queryKey: ["groups", "admin"],
    queryFn: () => groupApi.getAllGroups(),
    ...options,
  })
}
