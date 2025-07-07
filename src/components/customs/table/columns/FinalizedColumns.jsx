import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { formatDate } from "@/utils"
import StatusBadge from "../../badge/status-badge"
import NullableCell from "../cells/nullable-cell"

const columnHelper = createColumnHelper()

export const getFinalizedReportColumns = () => {
  return [
    columnHelper.accessor("name", {
      header: "Registro",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("job", {
      header: "Agente",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("orderCount", {
      header: "Pagos",
      cell: (info) => <NullableCell value={info.getValue()} />,
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
    columnHelper.accessor("phone", {
      header: "Teléfono",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("updated_at", {
      header: "Fecha de finalización",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("status", {
      header: "Estatus",
      cell: (info) => <StatusBadge status={info.getValue()} />,
      meta: { align: "center" },
    }),
  ]
}
