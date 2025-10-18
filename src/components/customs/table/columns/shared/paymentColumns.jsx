import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import NullableCell from "../../cells/nullable-cell"
import OxxoPayIcon from "@/assets/oxxo-pay.svg?react"
import PayCashIcon from "@/assets/pay-cash.svg?react"
import SPEIIcon from "@/assets/spei_icon.svg?react"

const columnHelper = createColumnHelper()

/**
 * Creates a reference column that displays clabe or reference value
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createReferenceColumn = (columnHelper) =>
  columnHelper.accessor("reference", {
    header: "Referencia",
    cell: ({ row }) => {
      const clabe = row.original.clabe
      const reference = row.original.reference
      const value = clabe || reference
      return <NullableCell value={value} className="text-center" />
    },
    meta: { align: "center" },
  })

/**
 * Creates a payment method column with standardized icons
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createPaymentMethodColumn = (columnHelper) =>
  columnHelper.accessor("payment_method", {
    header: "Método de Pago",
    cell: ({ getValue }) => {
      const value = getValue()
      if (value === "cash") {
        return (
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <OxxoPayIcon className="w-20 h-10" />
          </div>
        )
      }
      if (value === "spei") {
        return (
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <SPEIIcon className="size-10" />
          </div>
        )
      }
      if (value === "bank") {
        return (
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <PayCashIcon className="w-20 h-10" />
          </div>
        )
      }
      return <NullableCell value={null} />
    },
    meta: { align: "center" },
  })

export { columnHelper }