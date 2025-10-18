import { DownloadIcon } from "lucide-react"
import React from "react"
import { 
  columnHelper,
  createPaymentMethodColumn,
  createAmountColumn,
  createDateColumn,
  createTextColumn
} from "./shared/commonColumns"
import PaymentStatusBadge from "../../badge/payment-status-badge"
import { Button } from "@/components/ui"

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
    createTextColumn(columnHelper, "user.username", "Usuario"),
    createTextColumn(columnHelper, "provider_order_id", "ID del Proveedor"),
    columnHelper.accessor("status", {
      header: "Estatus",
      cell: (info) => <PaymentStatusBadge status={info.getValue()} />,
      meta: { align: "center" },
    }),
    createPaymentMethodColumn(columnHelper),
    createAmountColumn(columnHelper, "amount", "Cantidad"),
    createTextColumn(columnHelper, "clabe", "CLABE"),
    createDateColumn(columnHelper, "created_at", "Fecha de Creación"),
    voucherColumn,
  ]
}