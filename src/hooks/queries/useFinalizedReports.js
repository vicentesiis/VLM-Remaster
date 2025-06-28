import { createColumnHelper } from "@tanstack/react-table"
import { formatDate } from "@/lib"
import React from "react"

const columnHelper = createColumnHelper()

export const getFinalizedReportColumns = () => [
  columnHelper.accessor("name", {
    header: "CLIENTE",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("job", {
    header: "AGENTE",
    cell: (info) => info.getValue() ?? "Sin asignar",
  }),
  columnHelper.accessor("orderCount", {
    header: "PAGOS",
    cell: (info) => info.getValue(),
    meta: { align: "center" },
  }),
  columnHelper.accessor("exit_date", {
    header: "FECHA DE SALIDA",
    cell: (info) =>
      info.getValue() ? formatDate(info.getValue()) : "-",
  }),
  columnHelper.accessor("phone", {
    header: "TELÉFONO",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("updated_at", {
    header: "FECHA DE FINALIZACIÓN",
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("status", {
    header: "ESTATUS",
    cell: (info) =>
      React.createElement(
        "span",
        { className: "capitalize text-muted-foreground" },
        info.getValue()
      ),
  }),
  columnHelper.accessor("contacted", {
    header: "CONTACTADO",
    cell: (info) =>
      React.createElement(
        "span",
        {
          className: info.getValue()
            ? "text-green-600 font-semibold"
            : "text-red-500 font-semibold",
      },
        info.getValue() ? "Sí" : "No"
      ),
    meta: { align: "center" },
  }),
]