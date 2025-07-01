import { getJobSheetDocument, getVoucherDocument } from "@/api/documentApi"

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
    console.error("Error downloading voucher", error)
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
    console.error("Error downloading voucher", error)
    throw error
  }
}
