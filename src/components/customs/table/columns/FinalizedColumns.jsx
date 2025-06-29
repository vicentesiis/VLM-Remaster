import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { formatDate } from "@/lib"
import StatusBadge from "../../badge/status-badge"

const columnHelper = createColumnHelper()

export const getFinalizedReportColumns = () => {
  return [
    columnHelper.accessor("name", {
      header: "Registro",
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor("job", {
      header: "Agente",
      cell: ({ getValue }) => <span>{getValue() ?? "Sin asignar"}</span>,
    }),
    columnHelper.accessor("orderCount", {
      header: "Pagos",
      cell: ({ getValue }) => <span>{getValue()}</span>,
      meta: { align: "center" },
    }),
    columnHelper.accessor("exit_date", {
      header: "Fecha de salida",
      cell: ({ getValue }) => (
        <span>{getValue() ? formatDate(getValue()) : "-"}</span>
      ),
    }),
    columnHelper.accessor("phone", {
      header: "Teléfono",
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor("updated_at", {
      header: "Fecha de finalización",
      cell: ({ getValue }) => <span>{formatDate(getValue())}</span>,
    }),
    columnHelper.accessor("status", {
      header: "Estatus",
      cell: (info) => <StatusBadge status={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("contacted", {
      header: "Contactado",
      cell: ({ getValue }) => {
        const value = getValue()
        return (
          <span
            className={
              value
                ? "font-semibold text-green-600"
                : "font-semibold text-red-500"
            }
          >
            {value ? "Sí" : "No"}
          </span>
        )
      },
      meta: { align: "center" },
    }),
  ]
}
