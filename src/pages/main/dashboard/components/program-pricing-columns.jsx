import React from "react"
import NullableCell from "@/components/customs/table/cells/nullable-cell"
import {
  columnHelper,
  createTextColumn,
  createAmountColumn,
  createAmountLocalColumn
} from "@/components/customs/table/columns/shared/commonColumns"
import { Badge } from "@/components/ui"

export const getProgramPricingColumns = () => {
  return [
    createTextColumn(columnHelper, "program_name", "Programa"),
    createAmountColumn(columnHelper, "price", "Precio USD", true),
    createAmountLocalColumn(columnHelper, "price_local", "Precio Local"),

    columnHelper.accessor("currency", {
      header: "Moneda",
      cell: (info) => {
        const currency = info.getValue()
        return currency ? (
          <div className="flex justify-center">
            <Badge variant="outline">{currency.toUpperCase()}</Badge>
          </div>
        ) : (
          <NullableCell value={null} className="text-center" />
        )
      },
      meta: { align: "center" },
    }),
  ]
}