import { useQuery } from "@tanstack/react-query"
import * as codexApi from "@/api/codexApi"

export const useGetPrograms = (options = {}) => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: () => codexApi.getPrograms(),
    ...options,
  })
}

export const useGetChannels = (options = {}) => {
  return useQuery({
    queryKey: ["channels"],
    queryFn: () => codexApi.getChannels(),
    ...options,
  })
}
