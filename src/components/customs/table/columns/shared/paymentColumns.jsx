
import React from "react"
import NullableCell from "../../cells/nullable-cell"
import OxxoPayIcon from "@/assets/oxxo-pay.svg?react"
import PayCashIcon from "@/assets/pay-cash.svg?react"
import SPEIIcon from "@/assets/spei_icon.svg?react"



/**
 * Creates a reference column that displays clabe or reference value
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "reference")
 * @param {string} header - The column header text (default: "Referencia")
 * @returns {Object} Column definition
 */
export const createReferenceColumn = (columnHelper, accessor = "reference", header = "Referencia") =>
  columnHelper.accessor(accessor, {
    header,
    cell: ({ row }) => {
      const clabe = row.original.clabe
      const reference = row.original[accessor]
      const value = clabe || reference
      return <NullableCell value={value} className="text-center" />
    },
    meta: { align: "center" },
  })

/**
 * Creates a payment method column with standardized icons
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "payment_method")
 * @param {string} header - The column header text (default: "Método de Pago")
 * @returns {Object} Column definition
 */
export const createPaymentMethodColumn = (columnHelper, accessor = "payment_method", header = "Método de Pago") =>
  columnHelper.accessor(accessor, {
    header,
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

