import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import NullableCell from "../../cells/nullable-cell"
import { Badge } from "@/components/ui"
import { formatCurrency, formatCurrencyUSD } from "@/utils"

const columnHelper = createColumnHelper()

/**
 * Creates a local amount owed column with currency display
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createAmountOwedLocalColumn = (columnHelper) =>
  columnHelper.accessor("amount_owed_local", {
    header: "Por pagar local",
    cell: (info) => {
      const amount = info.getValue()
      const currency = info.row.original.currency

      if (amount == null) return <NullableCell value={null} className="text-center" />

      const formattedAmount = formatCurrency(amount)
      const amountFormated = `${formattedAmount} ${currency?.toUpperCase() || ''}`

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
 * @returns {Object} Column definition
 */
export const createAmountOwedColumn = (columnHelper) =>
  columnHelper.accessor("amount_owed", {
    header: "USD",
    cell: (info) => {
      const amount = info.getValue()
      if (amount == null) return <NullableCell value={null} className="text-center" />

      const formattedAmount = formatCurrencyUSD(amount)

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
      
      const formattedAmount = isUSD 
        ? formatCurrencyUSD(parseFloat(amount).toFixed(2))
        : formatCurrency(amount)
      
      return <NullableCell value={formattedAmount} className="text-center" />
    },
    meta: { align: "center" },
  })

/**
 * Creates a local amount column with currency display
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createAmountLocalColumn = (columnHelper) =>
  columnHelper.accessor("amount_local", {
    header: "Cantidad Local",
    cell: ({ row }) => {
      const { amount_local, currency } = row.original
      const value = amount_local && currency ? `${formatCurrency(parseFloat(amount_local).toFixed(2))} ${currency.toUpperCase()}` : null
      return <NullableCell value={value} />
    },
    meta: { align: "center" },
  })

export { columnHelper }