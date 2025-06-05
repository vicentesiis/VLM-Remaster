import { useQuery } from "@tanstack/react-query"
import * as recordApi from "@/api/recordApi"

export const useGetRecords = (params) =>
  useQuery({
    queryKey: ["records", params],
    queryFn: () => recordApi.getRecordsByCriteria(params),
  })
