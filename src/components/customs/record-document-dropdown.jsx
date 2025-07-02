import {
  DownloadIcon,
  FileTextIcon,
  FileCheckIcon,
  StampIcon,
  ChevronDownIcon,
} from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { useState, useMemo } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { RecordStatuses, PaymentStatuses } from "@/constants"
import { useGetOrdersByRecord } from "@/hooks/queries/useOrder"
import {
  downloadRecordRegistration,
  downloadRecordPreContract,
  downloadRecordApproval,
} from "@/services/documentService"

export function RecordDocumentDropdown({ registro, isAgent, canUpdateStatus }) {
  const { id: recordId, status, job } = registro

  const { data: ordersData } = useGetOrdersByRecord({
    record_id: recordId,
  })

  const orders = ordersData?.data ?? []

  const [loadingDoc, setLoadingDoc] = useState(null)
  const isDownloading = Boolean(loadingDoc)

  const handleDownload = async (type) => {
    setLoadingDoc(type)
    try {
      if (type === "registration") await downloadRecordRegistration(recordId)
      if (type === "precontract") await downloadRecordPreContract(recordId)
      if (type === "approval") await downloadRecordApproval(recordId)
    } catch {
      toast.error("Error al descargar el documento")
    } finally {
      setLoadingDoc(null)
    }
  }

  const hasJob = Boolean(job)

  const canDownloadPreContract =
    hasJob && status === RecordStatuses.CONTRACT_GENERATED && canUpdateStatus

  const canDownloadRegistration = useMemo(() => {
    if (!isAgent || !canUpdateStatus) return false
    return orders.some(
      (order) =>
        order.status === PaymentStatuses.CREATED ||
        order.status === PaymentStatuses.PENDING
    )
  }, [orders, hasJob, isAgent, canUpdateStatus])

  const canDownloadApproval =
    hasJob && status === RecordStatuses.APPROVED && canUpdateStatus

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          isLoading={isDownloading}
          className="ml-auto flex"
        >
          <DownloadIcon />
          Documentos
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => handleDownload("registration")}
          disabled={!canDownloadRegistration || isDownloading}
        >
          <FileTextIcon />
          Registración
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDownload("precontract")}
          disabled={!canDownloadPreContract || isDownloading}
        >
          <FileCheckIcon />
          Pre-Contrato
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDownload("approval")}
          disabled={!canDownloadApproval || isDownloading}
        >
          <StampIcon />
          Aprobación
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

RecordDocumentDropdown.propTypes = {
  registro: PropTypes.any,
  isAgent: PropTypes.any,
  canUpdateStatus: PropTypes.any,
}

export default RecordDocumentDropdown
