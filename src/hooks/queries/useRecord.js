import { useQuery } from "@tanstack/react-query"
import * as recordApi from "@/api/recordApi"

export const useGetRecords = (params, options = {}) =>
  useQuery({
    queryKey: ["records", params],
    queryFn: () => recordApi.getRecordsByCriteria(params),
    ...options,
  })
