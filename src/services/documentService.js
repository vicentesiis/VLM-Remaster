import {
  getApprovalDocument,
  getJobSheetDocument,
  getPreContractDocument,
  getRegistrationDocument,
  getVoucherDocument,
} from "@/api/documentApi"
import * as reportApi from "@/api/reportApi"

export const downloadVoucher = async (orderId) => {
  try {
    const response = await getVoucherDocument({ order_id: orderId })

    const blob = response.data || response

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `voucher-${orderId}.jpg`
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloadVoucher", error)
    throw error
  }
}

export const downloadVacantDetail = async (vacantId) => {
  try {
    const response = await getJobSheetDocument({ job_id: vacantId })

    const blob = response.data || response

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `vacant-${vacantId}.jpg`
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloadVacantDetail", error)
    throw error
  }
}

export const downloadRecordRegistration = async (recordID) => {
  try {
    const response = await getRegistrationDocument({ record_id: recordID })

    const blob = response.data || response

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `record-${recordID}.jpg`
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloadRecordRegistration", error)
    throw error
  }
}

export const downloadRecordPreContract = async (recordID) => {
  try {
    const response = await getPreContractDocument({ record_id: recordID })

    const blob = response.data || response

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `record-${recordID}.jpg`
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloadRecordRegistration", error)
    throw error
  }
}

export const downloadRecordApproval = async (recordID) => {
  try {
    const response = await getApprovalDocument({ record_id: recordID })

    const blob = response.data || response

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `record-${recordID}.jpg`
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloadRecordRegistration", error)
    throw error
  }
}

export const downloadAgentCutOff = async (agentId) => {
  try {
    const response = await reportApi.postAgentCutOff({ agent_id: agentId })
    const blob = response.data || response
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `cutoff-${agentId}.jpg` 
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloadAgentCutOff", error)
    throw error
  }
}