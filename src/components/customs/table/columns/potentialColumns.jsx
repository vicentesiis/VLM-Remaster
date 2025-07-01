import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { formatDate } from "@/utils"

const columnHelper = createColumnHelper()

export const usePotencialColumns = () => [
  columnHelper.accessor("orderIds", {
    header: "ID de Orden",
    cell: ({ getValue }) => <span>{getValue.join(", ")}</span>,
  }),
  columnHelper.accessor("clientId", {
    header: "ID Cliente",
    cell: ({ getValue }) => <span>{getValue}</span>,
  }),
  columnHelper.accessor("clientName", {
    header: "Nombre Cliente",
    cell: ({ getValue }) => <span>{getValue}</span>,
  }),
  columnHelper.accessor("agent", {
    header: "Agente",
    cell: ({ getValue }) => <span>{getValue || "Sin asignar"}</span>,
  }),
  // columna grupo si la agregas, algo así:
  // columnHelper.accessor("group", {
  //   header: "Grupo",
  //   cell: ({ getValue }) => <span>{getValue}</span>,
  // }),
  columnHelper.accessor("expirationDates", {
    header: "Fecha de Vencimiento de Orden",
    cell: ({ getValue }) => (
      <span>{getValue.map(date => (date ? formatDate(date) : "-")).join(", ")}</span>
    ),
  }),
  columnHelper.accessor("totalAmount", {
    header: "Monto Total",
    cell: ({ getValue }) => <span>${getValue.toFixed(2)}</span>,
    meta: { align: "right" },
  }),
]