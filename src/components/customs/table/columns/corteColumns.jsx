
import { createColumnHelper } from "@tanstack/react-table"
import { Banknote, CreditCard } from "lucide-react"
import React from "react"
import NullableCell from "../cells/nullable-cell"
import { formatDate } from "@/utils"
import { formatCurrency } from "@/utils"

const columnHelper = createColumnHelper()

export const getCorteColumns = () => {
  return [
    columnHelper.accessor("created_at", {
      header: "Fecha de Creación",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
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
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("clabe", {
      header: "CLABE",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("payment_method", {
      header: "Método de Pago",
      cell: ({ getValue }) => {
        const value = getValue()
        if (value === "cash") {
          return (
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Banknote className="h-4 w-4" />
              <span>Efectivo</span>
            </div>
          )
        }
        if (value === "spei") {
          return (
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span>SPEI</span>
            </div>
          )
        }
        return <NullableCell value={null} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("expiration_date", {
      header: "Fecha de Expiración",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
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
  ]
}