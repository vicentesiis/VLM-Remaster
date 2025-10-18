
import { createColumnHelper } from "@tanstack/react-table"
import { 
  createPaymentMethodColumn, 
  createAmountLocalColumn,
  createDateColumn,
  createAmountColumn,
  createReferenceColumn
} from "./shared/commonColumns"

const columnHelper = createColumnHelper()

export const getCorteColumns = () => {
  return [
    createDateColumn(columnHelper, "created_at", "Fecha de Creación"),
    createAmountLocalColumn(columnHelper),
    createAmountColumn(columnHelper, "amount", "Cantidad USD"),
    createReferenceColumn(columnHelper),
    createPaymentMethodColumn(columnHelper),
    createDateColumn(columnHelper, "expiration_date", "Fecha de Expiración"),
    createDateColumn(columnHelper, "payment_date", "Fecha de Pago"),
  ]
}