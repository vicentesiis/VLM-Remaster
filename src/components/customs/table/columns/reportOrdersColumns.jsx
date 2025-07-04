import { createColumnHelper } from "@tanstack/react-table"
import { Banknote, CreditCard } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import PaymentStatusBadge from "../../badge/payment-status-badge"
import NullableCell from "../cells/nullable-cell"
import VoucherButton from "../cells/voucher-button-cell"
import { downloadVoucher } from "@/services/documentService"
import { formatDate } from "@/utils"
import { formatCurrency } from "@/utils"
import { MainCell } from "../cells"

const columnHelper = createColumnHelper()

export const getReportOrdersColumns = () => {
  const columns = [
    // Registro column
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
            path="/ventas-por-agente"
          />
        )
      },
      meta: { align: "left" },
    }),

    // Fecha de Creación
    // columnHelper.accessor("created_at", {
    //   header: "Fecha de Creación",
    //   cell: (info) => {
    //     const date = info.getValue()
    //     return <NullableCell value={date ? formatDate(date) : null} />
    //   },
    //   meta: { align: "center" },
    // }),

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

    // CLABE
    // columnHelper.accessor("clabe", {
    //   header: "CLABE",
    //   cell: (info) => <NullableCell value={info.getValue()} />,
    //   meta: { align: "center" },
    // }),

    // Referencia
    // columnHelper.accessor("reference", {
    //   header: "Referencia",
    //   cell: (info) => <NullableCell value={info.getValue()} />,
    //   meta: { align: "center" },
    // }),

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
