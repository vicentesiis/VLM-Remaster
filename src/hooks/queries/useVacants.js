import { useQuery } from "@tanstack/react-query"
import * as vacantApi from "@/api/vacantApi"
import { toURLSearchParams } from "@/utils"

export const useGetVacants = (filters, options = {}) => {
  const params = toURLSearchParams(filters)
  return useQuery({
    queryKey: ["vacants"],
    queryFn: async () => {
      return await vacantApi.getJobsByCriteria(params)
    },
    ...options,
  })
}

export const useGetVacantbyId = (id, options = {}) => {
  return useQuery({
    queryKey: ["vacants-detail", id],
    queryFn: async () => {
      const response = await vacantApi.getJobById(id)
      return response.data
    },
    ...options,
  })
}

export const useGetVacantbyIdTranslated = (id, options = {}) => {
  return useQuery({
    queryKey: ["vacants-detail-translated", id],
    queryFn: async () => {
      const response = await vacantApi.getTranslatedJobById(id)
      return response.data
    },
    ...options,
  })
}
