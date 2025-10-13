import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import StatusBadge from "../../badge/status-badge"
import { MainCell } from "../cells"
import NullableCell from "../cells/nullable-cell"
import { createAmountOwedColumn, createStatusColumn, createRecordTypeColumn, createProgramColumn, createAmountOwedLocalColumn } from "./shared/commonColumns"

const columnHelper = createColumnHelper()

export const usePotencialColumns = () => [
  columnHelper.accessor((row) => row.public_id, {
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

  createStatusColumn(columnHelper),

  createRecordTypeColumn(columnHelper),

  createProgramColumn(columnHelper),
  {
    ...createAmountOwedLocalColumn(columnHelper),
    header: "Cantidad potencial local",
  },
  {
    ...createAmountOwedColumn(columnHelper),
    header: "USD",
  },
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
