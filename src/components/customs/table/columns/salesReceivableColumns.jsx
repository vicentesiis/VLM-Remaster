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
    createAmountOwedLocalColumn(columnHelper),
    createAmountOwedColumn(columnHelper),

  ]

  return columns
}
