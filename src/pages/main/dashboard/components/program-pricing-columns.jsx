import NullableCell from "@/components/customs/table/cells/nullable-cell"
import {
  columnHelper,
  createAmountColumn,
} from "@/components/customs/table/columns/shared/commonColumns"
import { formatCurrency } from "@/utils"

export const getProgramPricingColumns = (currencies = []) => {
  const columns = [
    columnHelper.accessor("program", {
      header: "Programa",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="font-medium">
            {value || <NullableCell value={null} />}
          </div>
        );
      },
      size: 0,
    }),
    createAmountColumn(columnHelper, "usd", "Precio USD", true),
  ];

  // Add a column for each currency
  currencies.forEach((currency) => {
    const currencyKey = currency.toLowerCase();
    columns.push(
      columnHelper.accessor(currencyKey, {
        header: currency.toUpperCase(),
        cell: ({ row }) => {
          const amount = row.original[currencyKey];
          const value = amount != null ? formatCurrency(amount, currency.toUpperCase()) : null;
          return <NullableCell value={value} className="text-center" />;
        },
        meta: { align: "center" },
      })
    );
  });

  return columns;
}