import {
  columnHelper,
  createAmountOwedColumn,
  createStatusColumn,
  createRecordTypeColumn,
  createProgramColumn,
  createAmountOwedLocalColumn,
  createMainCellColumn,
  createOrdersCountColumn
} from "./shared/commonColumns"

export const usePotencialColumns = () => [
  createMainCellColumn(columnHelper, "name", "Cliente", { id: "registro" }),
  createStatusColumn(columnHelper),
  createRecordTypeColumn(columnHelper),
  createProgramColumn(columnHelper),
  createAmountOwedLocalColumn(columnHelper, "amount_owed_local", "Cantidad potencial local"),
  createAmountOwedColumn(columnHelper, "amount_owed", "USD"),
  createOrdersCountColumn(columnHelper),
]
