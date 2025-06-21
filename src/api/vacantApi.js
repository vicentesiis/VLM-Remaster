import { apiClient } from "./apiClient"

export const getJobById = (job_id) =>
  apiClient.get(`/jobs/job`, { params: { job_id } })

export const getTranslatedJobById = (job_id) =>
  apiClient.get(`/jobs/job/translate`, { params: { job_id } })

export const getJobsByCriteria = (params) =>
  apiClient.get(`/jobs/jobs?${params.toString()}`)

export const getJobAmountByCountry = (params) =>
  apiClient.get(`/jobs/amount-by-country?${params.toString()}`)

export const getJobAmountByCategory = (params) =>
  apiClient.get(`/jobs/amount-by-category?${params.toString()}`)

export const getJobAmountByCountryAndState = (params) =>
  apiClient.get(`/jobs/amount-by-country-and-state?${params.toString()}`)
