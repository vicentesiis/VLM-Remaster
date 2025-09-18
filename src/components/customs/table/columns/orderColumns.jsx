import { createColumnHelper } from "@tanstack/react-table"
import React, { useState } from "react"
import { toast } from "sonner"
import PaymentStatusBadge from "../../badge/payment-status-badge"
import NullableCell from "../cells/nullable-cell"
import VoucherButton from "../cells/voucher-button-cell"
import OxxoPayIcon from "@/assets/oxxo-pay.svg?react"
import PayCashIcon from "@/assets/pay-cash.svg?react"
import SPEIIcon from "@/assets/spei_icon.svg?react"
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
    columnHelper.accessor("payment_method", {
      header: "Método de Pago",
      cell: ({ getValue }) => {
        const value = getValue()
        if (value === "cash") {
          return (
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <OxxoPayIcon className="w-20 h-10" />
              {/* <span>Oxxo Pay</span> */}
            </div>
          )
        }
        if (value === "spei") {
          return (
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <SPEIIcon className="size-10" />
              {/* <span>SPEI</span> */}
            </div>
          )
        }
        if (value === "bank") {
          return (
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <PayCashIcon className="w-20 h-10" />
            </div>
          )
        }
        return <NullableCell value={null} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("amount", {
      header: "Cantidad",
      cell: (info) => {
        const amount = info.getValue()
        return <NullableCell value={amount ? formatCurrency(amount) : null} />
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
