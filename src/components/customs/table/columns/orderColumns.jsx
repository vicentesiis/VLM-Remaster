import { createColumnHelper } from "@tanstack/react-table"
import { Banknote, CreditCard, DownloadIcon } from "lucide-react"
import React from "react"
import PaymentStatusBadge from "../../badge/payment-status-badge"
import { Button } from "@/components/ui"
import { formatDate } from "@/lib"
import { formatCurrency } from "@/utils"

const columnHelper = createColumnHelper()

export const getOrdersColumns = () => {
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
    columnHelper.accessor("provider_order_id", { header: "ID del Provedor" }),
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
            <div className="flex items-center justify-center gap-1 text-sm">
              <Banknote className="h-4 w-4 text-primary" />
              <span>Efectivo</span>
            </div>
          )
        }
        if (value === "spei") {
          return (
            <div className="flex items-center justify-center gap-1 text-sm">
              <CreditCard className="h-4 w-4 text-primary" />
              <span>SPEI</span>
            </div>
          )
        }
        return <span className="text-muted-foreground">-</span>
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("amount", {
      header: "Cantidad",
      cell: (info) => formatCurrency(info.getValue()),
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("clabe", {
      header: "CLABE",
      cell: (info) => info.getValue() ?? "No aplica",
      meta: { align: "center" },
    }),
    columnHelper.accessor("created_at", {
      header: "Fecha de Creación",
      cell: (info) => formatDate(info.getValue()),
      meta: { align: "center" },
    }),
    voucherColumn,
  ]
}
