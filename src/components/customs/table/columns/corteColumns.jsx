
import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import NullableCell from "../cells/nullable-cell"
import { createPaymentMethodColumn } from "./shared/commonColumns"
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
    createPaymentMethodColumn(columnHelper),
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