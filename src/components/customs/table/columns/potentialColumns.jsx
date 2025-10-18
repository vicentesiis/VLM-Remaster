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
  {
    ...createAmountOwedLocalColumn(columnHelper),
    header: "Cantidad potencial local",
  },
  {
    ...createAmountOwedColumn(columnHelper),
    header: "USD",
  },
  createOrdersCountColumn(columnHelper),
]
