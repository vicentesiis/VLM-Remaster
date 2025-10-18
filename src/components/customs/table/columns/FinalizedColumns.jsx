import { 
  columnHelper,
  createAmountOwedColumn,
  createAmountOwedLocalColumn,
  createDateColumn,
  createMainCellColumn
} from "./shared/commonColumns"

export const getFinalizedReportColumns = () => {
  return [
    createMainCellColumn(columnHelper, "public_id", "Cliente", { 
      nameField: "name", 
      recordPath: null, // Remove recordPath since we're accessing the record directly
      id: "registro" 
    }),
    createAmountOwedLocalColumn(columnHelper, "amount_owed_local", "Cantidad local"),
    createAmountOwedColumn(columnHelper, "amount_owed", "Cantidad USD"),
    createDateColumn(columnHelper, "created_at", "Fecha de creación"),
    createDateColumn(columnHelper, "assignment_date", "Fecha de asignación"),
    createDateColumn(columnHelper, "end_date", "Fecha de finalización"),
    createDateColumn(columnHelper, "exit_date", "Fecha de salida"),
  ]
}
