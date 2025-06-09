import { useQuery } from "@tanstack/react-query"
import * as codexApi from "@/api/codexApi"

// Record Statuses
export const useGetRecordStatuses = (options = {}) => {
  return useQuery({
    queryKey: ["record-statuses"],
    queryFn: () => codexApi.getRecordStatuses(),
    ...options,
  })
}

// Record Types
export const useGetRecordTypes = (options = {}) => {
  return useQuery({
    queryKey: ["record-types"],
    queryFn: () => codexApi.getRecordTypes(),
    ...options,
  })
}

// Programs
export const useGetPrograms = (options = {}) => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: () => codexApi.getPrograms(),
    ...options,
  })
}

// Channels
export const useGetChannels = (options = {}) => {
  return useQuery({
    queryKey: ["channels"],
    queryFn: () => codexApi.getChannels(),
    ...options,
  })
}

// Nationalities
export const useGetNationalities = (options = {}) => {
  return useQuery({
    queryKey: ["nationalities"],
    queryFn: () => codexApi.getNationalities(),
    ...options,
  })
}

// Mexico States
export const useGetMexicoStates = (options = {}) => {
  return useQuery({
    queryKey: ["mexico-states"],
    queryFn: () => codexApi.getMexicoStates(),
    ...options,
  })
}

// Roles
export const useGetRoles = (options = {}) => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => codexApi.getRoles(),
    ...options,
  })
}

// Agent Types
export const useGetAgentTypes = (options = {}) => {
  return useQuery({
    queryKey: ["agent-types"],
    queryFn: () => codexApi.getAgentTypes(),
    ...options,
  })
}
