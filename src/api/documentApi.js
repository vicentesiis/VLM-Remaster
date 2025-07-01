import { apiClient } from "./apiClient"

export const getVoucherDocument = (params) =>
  apiClient.getBlob("/documents/voucher", { params })

export const getJobSheetDocument = (params) =>
  apiClient.getBlob("/documents/job-sheet", { params })

export const getRegistrationDocument = (params) =>
  apiClient.getBlob("/documents/registration", { params })

export const getPreContractDocument = (params) =>
  apiClient.getBlob("/documents/pre-contract", { params })

export const getApprovalDocument = (params) =>
  apiClient.getBlob("/documents/approval", { params })
