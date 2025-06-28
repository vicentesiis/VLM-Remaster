import { apiClient } from "@/api/apiClient"

export const getRecordStatuses = () => apiClient.get("/codex/record-statuses")
export const getRecordTypes = () => apiClient.get("/codex/record-types")
export const getPrograms = () => apiClient.get("/codex/programs")
export const getChannels = () => apiClient.get("/codex/channels")
export const getNationalities = () => apiClient.get("/codex/nationalities")
export const getMexicoStates = () => apiClient.get("/codex/mexico-states")
export const getRoles = () => apiClient.get("/codex/roles")
export const getVacantCategories = () => apiClient.get("/codex/job-categories")
export const getCountryStates = () => apiClient.get("/codex/country-states")
