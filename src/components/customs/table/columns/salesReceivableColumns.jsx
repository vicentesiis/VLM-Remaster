import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { MainCell } from "../cells"
import NullableCell from "../cells/nullable-cell"
import { createAmountOwedColumn, createAmountOwedLocalColumn } from "./shared/commonColumns"

const columnHelper = createColumnHelper()

export const salesReceivableColumns = () => {
  const columns = [
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
      size: 300,
      minSize: 200,
    }),
    createAmountOwedLocalColumn(columnHelper),
    createAmountOwedColumn(columnHelper),

  ]

  return columns
}
