import { useQuery } from "@tanstack/react-query"
import * as vacantApi from "@/api/vacantApi"

const buildVacantQueryParams = (filters) => {
  const params = new URLSearchParams()

  if (filters.country) params.set("country", filters.country)
  if (filters.state) params.set("state", filters.state)
  if (filters.category) params.set("category", filters.category)
  if (filters.min_rate !== undefined) params.set("min_rate", filters.min_rate)
  if (filters.max_rate !== undefined) params.set("max_rate", filters.max_rate)
  if (filters.min_popularity !== undefined)
    params.set("min_popularity", filters.min_popularity)
  if (filters.skip !== undefined) params.set("skip", filters.skip)
  if (filters.limit !== undefined) params.set("limit", filters.limit)

  return params
}

export const useGetVacants = (filters, options = {}) => {
  const params = buildVacantQueryParams(filters)
  return useQuery({
    queryKey: ["vacants", params],
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
