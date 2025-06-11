import { useQuery } from "@tanstack/react-query"
import * as recordApi from "@/api/recordApi"
import { Roles } from "@/constants/appConstants"

export const useGetRecords = (
  params,
  title,
  currentRole,
  userId,
  options = {}
) => {
  return useQuery({
    queryKey: ["records", title, userId, params],
    queryFn: async () => {
      let res

      if (currentRole === Roles.AGENT) {
        if (title.startsWith("Mis")) {
          res = await recordApi.getRecordsByUser({
            ...params,
            user_id: userId,
          })
        } else {
          res = await recordApi.getRecordsByCriteria(params)
        }
      } else {
        res = await recordApi.getRecordsByCriteria(params)
      }

      await new Promise((resolve) => setTimeout(resolve, 300))
      return res
    },
    ...options,
  })
}
