import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { formatDate } from "@/utils"
import NullableCell from "../cells/nullable-cell"

const columnHelper = createColumnHelper()

export const usePotencialColumns = () => [
  columnHelper.accessor("orderIds", {
    header: "ID de Orden",
    cell: ({ getValue }) => {
      const value = getValue()
      return <NullableCell value={value?.join(", ")} />
    },
    meta: { align: "center" },
  }),
  columnHelper.accessor("clientId", {
    header: "ID Cliente",
    cell: ({ getValue }) => <NullableCell value={getValue()} />,
    meta: { align: "center" },
  }),
  columnHelper.accessor("clientName", {
    header: "Nombre Cliente",
    cell: ({ getValue }) => <NullableCell value={getValue()} />,
    meta: { align: "center" },
  }),
  columnHelper.accessor("agent", {
    header: "Agente",
    cell: ({ getValue }) => <NullableCell value={getValue() || "Sin asignar"} />,
    meta: { align: "center" },
  }),
  // columnHelper.accessor("group", {
  //   header: "Grupo",
  //   cell: ({ getValue }) => <NullableCell value={getValue()} />,
  //   meta: { align: "center" },
  // }),
  columnHelper.accessor("expirationDates", {
    header: "Fecha de Vencimiento de Orden",
    cell: ({ getValue }) => {
      const value = getValue()
      return <NullableCell value={value?.map((d) => formatDate(d)).join(", ")} />
    },
    meta: { align: "center" },
  }),
  columnHelper.accessor("totalAmount", {
    header: "Monto Total",
    cell: ({ getValue }) => {
      const value = getValue()
      return <NullableCell value={value != null ? `$${value.toFixed(2)}` : null} />
    },
    meta: { align: "center" },
  }),
]