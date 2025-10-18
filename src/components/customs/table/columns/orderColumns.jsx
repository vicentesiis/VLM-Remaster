import { createColumnHelper } from "@tanstack/react-table"
import React, { useState } from "react"
import { toast } from "sonner"
import VoucherButton from "../cells/voucher-button-cell"
import {
  createPaymentMethodColumn,
  createDateColumn,
  createReferenceColumn,
  createAmountColumn,
  createPaymentStatusColumn,
  createAmountLocalColumn
} from "./shared/commonColumns"
import { downloadVoucher } from "@/services/documentService"

const columnHelper = createColumnHelper()

export const getOrdersColumns = (canCreateOrder) => {
  const voucherColumn = columnHelper.display({
    id: "voucher",
    header: "Voucher",
    cell: ({ row }) => {
      const order = row.original
      const [isLoading, setIsLoading] = useState(false)

      const handleDownload = async (order) => {
        setIsLoading(true)
        try {
          await downloadVoucher(order.id)
        } catch (error) {
          toast.error(error)
        } finally {
          setIsLoading(false)
        }
      }

      return (
        <VoucherButton
          order={order}
          canCreateOrder={canCreateOrder}
          isLoading={isLoading}
          onClick={handleDownload}
        />
      )
    },
    meta: { align: "center" },
  })
  return [
    createDateColumn(columnHelper, "created_at", "Fecha de Creación"),
    createPaymentStatusColumn(columnHelper),
    createPaymentMethodColumn(columnHelper),
    createAmountLocalColumn(columnHelper),
    createAmountColumn(columnHelper, "amount", "Cantidad USD", true),
    createReferenceColumn(columnHelper),
    createDateColumn(columnHelper, "payment_date", "Fecha de Pago"),
    voucherColumn,
  ]
}
