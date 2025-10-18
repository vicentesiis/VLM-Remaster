import { 
  columnHelper,
  createPaymentMethodColumn,
  createAmountLocalColumn,
  createAmountColumn,
  createDateColumn,
  createUsuarioColumn,
  createMainCellColumn,
  createBooleanStatusColumn
} from "./shared/commonColumns"

export const getReportOrdersColumns = () => {
  const columns = [
    createUsuarioColumn(columnHelper, "Usuario", "name", "username", "user"),
    createMainCellColumn(columnHelper, "public_id", "Cliente", { 
      nameField: "name", 
      recordPath: "record", 
      id: "registro" 
    }),
    createAmountLocalColumn(columnHelper),
    createAmountColumn(columnHelper, "amount", "USD", true),
    createPaymentMethodColumn(columnHelper),
    createDateColumn(columnHelper, "payment_date", "Fecha de Pago"),
    createBooleanStatusColumn(columnHelper, "paid_to_user", "Pagado a Agente"),
  ]

  return columns
}
