import { createColumnHelper } from "@tanstack/react-table"
import { Banknote, Check, CreditCard, X } from "lucide-react"
import React from "react"
import { MainCell } from "../cells"
import NullableCell from "../cells/nullable-cell"
import UsuarioCell from "../cells/usuario-cell"
import { formatDate } from "@/utils"
import { formatCurrency } from "@/utils"

const columnHelper = createColumnHelper()

export const getReportOrdersColumns = () => {
  const columns = [
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

    columnHelper.accessor("amount", {
      header: "Cantidad",
      cell: (info) => {
        const amount = info.getValue()
        return <NullableCell value={amount ? formatCurrency(amount) : null} />
      },
      meta: { align: "center" },
    }),

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

    columnHelper.accessor("payment_date", {
      header: "Fecha de Pago",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("paid_to_user", {
      header: "Pagado a Agente",
      cell: ({ getValue }) => {
        const active = getValue()
        if (typeof active !== "boolean") return <NullableCell value={null} />
        return (
          <div
            className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border ${
              active
                ? "border-green-500 bg-green-100 text-green-700"
                : "border-red-500 bg-red-100 text-red-700"
            }`}
          >
            {active ? (
              <Check className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <X className="h-4 w-4" strokeWidth={2.5} />
            )}
          </div>
        )
      },
      meta: { align: "center" },
    }),
  ]

  return columns
}
