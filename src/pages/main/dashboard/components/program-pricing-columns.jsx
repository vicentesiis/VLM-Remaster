import { Badge } from "@/components/ui"
import { columnHelper, createTextColumn } from "@/components/customs/table/columns/shared/commonColumns"
import { formatCurrency } from "@/utils"
import NullableCell from "@/components/customs/table/cells/nullable-cell"

export const getProgramPricingColumns = () => {
  return [
    createTextColumn(columnHelper, "program_name", "Programa"),
    
    columnHelper.accessor("price", {
      header: "Precio USD",
      cell: (info) => {
        const price = info.getValue()
        return price ? (
          <NullableCell value={formatCurrency(price, 'USD', { fromCents: false })} className="text-center font-medium" />
        ) : (
          <NullableCell value={null} className="text-center" />
        )
      },
      meta: { align: "center" },
    }),

    columnHelper.accessor("price_local", {
      header: "Precio Local",
      cell: (info) => {
        const priceLocal = info.getValue()
        const currency = info.row.original.currency
        return priceLocal && currency ? (
          <NullableCell 
            value={formatCurrency(priceLocal, currency, { fromCents: false })} 
            className="text-center font-medium" 
          />
        ) : (
          <NullableCell value={null} className="text-center" />
        )
      },
      meta: { align: "center" },
    }),

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