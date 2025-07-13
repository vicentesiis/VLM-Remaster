import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import StatusBadge from "../../badge/status-badge"
import { MainCell } from "../cells"
import NullableCell from "../cells/nullable-cell"
import { formatCurrency } from "@/utils"

const columnHelper = createColumnHelper()

export const usePotencialColumns = () => [
  columnHelper.accessor((row) => row.public_id, {
    id: "registro",
    header: "Cliente",
    cell: ({ row }) => {
      console.log("Row data:", row.original)
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

  columnHelper.accessor("status", {
    header: "Estatus",
    cell: (info) => <StatusBadge status={info.getValue()} />,
    meta: {
      align: "center",
      variant: "multiSelect",
      label: "Estatus",
      options: [],
      maxWidth: "100px",
    },
  }),

  columnHelper.accessor("record_type", {
    header: "Tipo",
    cell: (info) => (
      <NullableCell value={info.getValue()} className="text-center" />
    ),
    meta: {
      align: "center",
    },
  }),

  columnHelper.accessor("program", {
    header: "Programa",
    cell: (info) => (
      <NullableCell value={info.getValue()} className="text-center" />
    ),
    meta: {
      align: "center",
      variant: "multiSelect",
      label: "Programa",
      options: [],
    },
  }),

  columnHelper.accessor("amount_owed", {
    header: "Cantidad potencial",
    cell: (info) => {
      const amount = info.getValue()
      return (
        <NullableCell
          value={amount ? formatCurrency(amount) : null}
          className={"font-semibold"}
        />
      )
    },
    meta: { align: "center" },
  }),
  columnHelper.accessor((row) => row.orders?.length, {
    id: "orders",
    header: "Número de órdenes",
    cell: (info) => {
      const totalOrders = info.getValue()
      return (
        <NullableCell
          value={totalOrders ?? null}
          className="text-center font-semibold"
        />
      )
    },
    meta: { align: "center" },
  }),
]
