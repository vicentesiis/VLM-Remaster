import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import ActionDropdown from "../../action-dropdown"
import { formatDate } from "@/lib"

const columnHelper = createColumnHelper()

export const getOrdersColumns = () => {
  const voucherColumn = columnHelper.display({
    id: "voucher",
    header: "",
    cell: ({ row }) => (
      <ActionDropdown
        sections={[
          {
            title: "Cliente",
            options: [
              {
                title: "Detalle del Cliente",
                onSelect: () =>
                  alert(`Detalle del Cliente: ${row.original.name}`),
              },
              {
                title: "Órdenes del Cliente",
                onSelect: () =>
                  alert(`Órdenes del Cliente: ${row.original.name}`),
              },
            ],
          },
          {
            title: "Extras",
            options: [
              {
                title: "Generar Contrato",
                onSelect: () => alert("Generar Contrato"),
              },
            ],
          },
        ]}
      />
    ),
    meta: {
      align: "center",
      maxWidth: "60px",
    },
  })

  return [
    columnHelper.accessor("provider_order_id", { header: "ID del Provedor" }),
    columnHelper.accessor("status", { header: "Estatus" }),
    columnHelper.accessor("payment_method", { header: "Método de Pago" }),
    columnHelper.accessor("amount", { header: "Cantidad" }),
    columnHelper.accessor("clabe", { header: "CLABE" }),
    columnHelper.accessor("created_at", {
      header: "Fecha de creación",
      cell: (info) => formatDate(info.getValue()),
    }),
    voucherColumn,
  ]
}
