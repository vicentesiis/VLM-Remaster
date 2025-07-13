import { createColumnHelper } from "@tanstack/react-table"
import { Banknote, CreditCard } from "lucide-react"
import React from "react"
import { MainCell } from "../cells"
import NullableCell from "../cells/nullable-cell"
import UsuarioCell from "../cells/usuario-cell"
import { formatDate } from "@/utils"
import { formatCurrency } from "@/utils"

const columnHelper = createColumnHelper()

export const getReportOrdersColumns = () => {
  const columns = [
    // Registro column
    columnHelper.display({
      id: "usuario",
      header: "Usuario",
      cell: ({ row }) => {
        const user = row.original.user

        if (!user?.username && !user?.name) {
          return <NullableCell value={null} />
        }

        return <UsuarioCell name={user.name} username={user.username} />
      },
    }),
    columnHelper.accessor((row) => row.record?.public_id, {
      id: "registro",
      header: "Cliente",
      cell: ({ row }) => {
        const record = row.original.record
        if (!record?.public_id) return <NullableCell value={null} />

        return (
          <MainCell
            public_id={record.public_id}
            title={record.name}
            path="/detalle"
          />
        )
      },
      meta: { align: "left" },
    }),

    // Cantidad
    columnHelper.accessor("amount", {
      header: "Cantidad",
      cell: (info) => {
        const amount = info.getValue()
        return <NullableCell value={amount ? formatCurrency(amount) : null} />
      },
      meta: { align: "center" },
    }),

    // Método de Pago
    columnHelper.accessor("payment_method", {
      header: "Método de Pago",
      cell: ({ getValue }) => {
        const value = getValue()
        if (value === "cash") {
          return (
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Banknote className="h-4 w-4" />
              <span>Efectivo</span>
            </div>
          )
        }
        if (value === "spei") {
          return (
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span>SPEI</span>
            </div>
          )
        }
        return <NullableCell value={null} />
      },
      meta: { align: "center" },
    }),

    // Fecha de Pago
    columnHelper.accessor("payment_date", {
      header: "Fecha de Pago",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),
  ]

  return columns
}
