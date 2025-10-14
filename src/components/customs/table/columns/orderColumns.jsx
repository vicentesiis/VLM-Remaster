import { createColumnHelper } from "@tanstack/react-table"
import React, { useState } from "react"
import { toast } from "sonner"
import PaymentStatusBadge from "../../badge/payment-status-badge"
import NullableCell from "../cells/nullable-cell"
import VoucherButton from "../cells/voucher-button-cell"
import { 
  createPaymentMethodColumn, 
  createDateColumn, 
  createReferenceColumn 
} from "./shared/commonColumns"
import { downloadVoucher } from "@/services/documentService"
import { formatCurrencyUSD, formatDate } from "@/utils"
import { formatCurrency } from "@/utils"

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
    columnHelper.accessor("status", {
      header: "Estatus",
      cell: (info) => <PaymentStatusBadge status={info.getValue()} />,
      meta: { align: "center" },
    }),
    createPaymentMethodColumn(columnHelper),
    columnHelper.accessor("amount_local", {
      header: "Cantidad Local",
      cell: ({ row }) => {
        const { amount_local, currency } = row.original
        const value = amount_local && currency ? `${formatCurrency(parseFloat(amount_local).toFixed(2))} ${currency}` : null
        return <NullableCell value={value} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("amount", {
      header: "USD",
      cell: (info) => {
        const amount = info.getValue()
        return <NullableCell value={amount ? `${formatCurrencyUSD(parseFloat(amount).toFixed(2))}` : null} />
      },
      meta: { align: "center" },
    }),

    createReferenceColumn(columnHelper),
    createDateColumn(columnHelper, "payment_date", "Fecha de Pago"),

    voucherColumn,
  ]
}
