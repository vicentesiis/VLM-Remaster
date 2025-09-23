import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { MainCell } from "../cells"
import NullableCell from "../cells/nullable-cell"
import { formatCurrency, formatDate } from "@/utils"

const columnHelper = createColumnHelper()

export const getFinalizedReportColumns = () => {
  return [
    columnHelper.accessor((row) => row.record?.public_id, {
      id: "registro",
      header: "Cliente",
      cell: ({ row }) => {
        const record = row.original
        if (!record?.public_id) return <NullableCell value={null} />

        return (
          <MainCell
            public_id={record.public_id}
            title={record.name}
            path="/detalle"
          />
        )
      },
      meta: { align: "left" },
    }),
    columnHelper.accessor("amount_owed", {
      header: "Cantidad (?)",
      cell: (info) => {
        const amount = info.getValue()
        return <NullableCell value={amount ? formatCurrency(amount) : null} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("created_at", {
      header: "Fecha de creación",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("assignment_date", {
      header: "Fecha de asignación",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("end_date", {
      header: "Fecha de finalización",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("exit_date", {
      header: "Fecha de salida",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),
  ]
}
