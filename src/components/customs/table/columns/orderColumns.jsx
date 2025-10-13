import { createColumnHelper } from "@tanstack/react-table"
import React, { useState } from "react"
import { toast } from "sonner"
import PaymentStatusBadge from "../../badge/payment-status-badge"
import NullableCell from "../cells/nullable-cell"
import VoucherButton from "../cells/voucher-button-cell"
import { createPaymentMethodColumn } from "./shared/commonColumns"
import { downloadVoucher } from "@/services/documentService"
import { formatDate } from "@/utils"
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
    columnHelper.accessor("created_at", {
      header: "Fecha de Creación",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),
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
      header: "Cantidad (USD)",
      cell: (info) => {
        const amount = info.getValue()
        return <NullableCell value={amount ? `${formatCurrency(parseFloat(amount).toFixed(2))} USD` : null} />
      },
      meta: { align: "center" },
    }),

    columnHelper.accessor("reference", {
      header: "Referencia",
      cell: ({ row }) => {
        const clabe = row.original.clabe
        const reference = row.original.reference
        const value = clabe || reference
        return <NullableCell value={value} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("payment_date", {
      header: "Fecha de Pago",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),

    voucherColumn,
  ]
}
