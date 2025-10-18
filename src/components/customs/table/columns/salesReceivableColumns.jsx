import { 
  columnHelper,
  createAmountOwedColumn, 
  createAmountOwedLocalColumn,
  createMainCellColumn
} from "./shared/commonColumns"

export const salesReceivableColumns = () => {
  const columns = [
    {
      ...createMainCellColumn(columnHelper, "name", "Cliente", { id: "registro" }),
      size: 300,
      minSize: 200,
    },
    createAmountOwedLocalColumn(columnHelper, "amount_owed_local", "Por pagar local"),
    createAmountOwedColumn(columnHelper, "amount_owed", "USD"),

  ]

  return columns
}
