import { 
  columnHelper,
  createAmountOwedColumn,
  createDateColumn,
  createMainCellColumn
} from "./shared/commonColumns"

export const getFinalizedReportColumns = () => {
  return [
    createMainCellColumn(columnHelper, "public_id", "Cliente", { 
      nameField: "name", 
      recordPath: "record", 
      id: "registro" 
    }),
    createAmountOwedColumn(columnHelper, "amount_owed", "USD"),
    createDateColumn(columnHelper, "created_at", "Fecha de creación"),
    createDateColumn(columnHelper, "assignment_date", "Fecha de asignación"),
    createDateColumn(columnHelper, "end_date", "Fecha de finalización"),
    createDateColumn(columnHelper, "exit_date", "Fecha de salida"),
  ]
}
