import { createColumnHelper } from "@tanstack/react-table"
import { DownloadIcon } from "lucide-react"
import React from "react"
import PaymentStatusBadge from "../../badge/payment-status-badge"
import NullableCell from "../cells/nullable-cell"
import { createPaymentMethodColumn } from "./shared/commonColumns"
import { Button } from "@/components/ui"
import { formatDate } from "@/utils"
import { formatCurrency } from "@/utils"

const columnHelper = createColumnHelper()

export const getReportColumns = () => {
  const voucherColumn = columnHelper.display({
    id: "voucher",
    header: "Voucher",
    cell: ({ row }) => {
      const handleClick = () => {
        alert(`Voucher: ${row.original.name}`)
      }

      return (
        <Button size="icon" variant="ghost" onClick={handleClick}>
          <DownloadIcon className="h-4 w-4" />
        </Button>
      )
    },
    meta: {
      align: "center",
      maxWidth: "60px",
    },
  })

  return [
    columnHelper.accessor("user.username", {
      id: "username",
      header: "Usuario",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("provider_order_id", {
      header: "ID del Proveedor",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("status", {
      header: "Estatus",
      cell: (info) => <PaymentStatusBadge status={info.getValue()} />,
      meta: { align: "center" },
    }),
    createPaymentMethodColumn(columnHelper),
    columnHelper.accessor("amount", {
      header: "Cantidad",
      cell: (info) => {
        const value = info.getValue()
        return <NullableCell value={value ? formatCurrency(value) : null} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("clabe", {
      header: "CLABE",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("created_at", {
      header: "Fecha de Creación",
      cell: (info) => {
        const value = info.getValue()
        return <NullableCell value={value ? formatDate(value) : null} />
      },
      meta: { align: "center" },
    }),
    voucherColumn,
  ]
}