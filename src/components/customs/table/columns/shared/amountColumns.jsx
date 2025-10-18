
import React from "react"
import NullableCell from "../../cells/nullable-cell"
import { Badge } from "@/components/ui"
import { formatCurrency } from "@/utils"



/**
 * Creates a local amount owed column with currency display
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "amount_owed_local")
 * @param {string} header - The column header text (default: "Por pagar local")
 * @returns {Object} Column definition
 */
export const createAmountOwedLocalColumn = (columnHelper, accessor = "amount_owed_local", header = "Por pagar local") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => {
      const amount = info.getValue()
      const currency = info.row.original.currency

      if (amount == null) return <NullableCell value={null} className="text-center" />

      const amountFormated = formatCurrency(amount, currency || 'USD')

      return (
        <div className="flex justify-center">
          <Badge
            variant={amount > 0 ? "destructive" : "outline"}
          >
            {amountFormated}
          </Badge>
        </div>
      )
    },
    meta: {
      align: "center",
    },
  })

/**
 * Creates an amount owed column for admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "amount_owed")
 * @param {string} header - The column header text (default: "USD")
 * @returns {Object} Column definition
 */
export const createAmountOwedColumn = (columnHelper, accessor = "amount_owed", header = "USD") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => {
      const amount = info.getValue()
      if (amount == null) return <NullableCell value={null} className="text-center" />

      const formattedAmount = formatCurrency(amount, 'USD')

      return (
        <div className="flex justify-center">
          <Badge
            variant={amount > 0 ? "destructive" : "outline"}
          >
            {formattedAmount}
          </Badge>
        </div>
      )
    },
    meta: {
      align: "center",
    },
  })

/**
 * Creates a generic amount column with currency formatting
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key
 * @param {string} header - The column header text
 * @param {boolean} isUSD - Whether to format as USD (default: false)
 * @returns {Object} Column definition
 */
export const createAmountColumn = (columnHelper, accessor, header, isUSD = false) =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => {
      const amount = info.getValue()
      if (!amount) return <NullableCell value={null} className="text-center" />
      
      const formattedAmount = formatCurrency(amount, isUSD ? 'USD' : 'MXN')
      
      return <NullableCell value={formattedAmount} className="text-center" />
    },
    meta: { align: "center" },
  })

/**
 * Creates a local amount column with currency display
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "amount_local")
 * @param {string} header - The column header text (default: "Cantidad Local")
 * @returns {Object} Column definition
 */
export const createAmountLocalColumn = (columnHelper, accessor = "amount_local", header = "Cantidad Local") =>
  columnHelper.accessor(accessor, {
    header,
    cell: ({ row }) => {
      const amount_local = row.original[accessor]
      const currency = row.original.currency
      const value = amount_local && currency ? formatCurrency(amount_local, currency) : null
      return <NullableCell value={value} />
    },
    meta: { align: "center" },
  })

