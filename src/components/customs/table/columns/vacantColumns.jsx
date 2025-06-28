import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { Link } from "react-router-dom"
import { ALL_PROVINCES, VACANT_CATEGORIES } from "@/constants"
import { formatDate } from "@/lib"
import { formatCurrency, mapToOptions, toTitleCase } from "@/utils"

const columnHelper = createColumnHelper()

export const getVacantColumns = () => {
  return [
    columnHelper.accessor("id", {
      header: "ID",
      meta: { align: "center", maxWidth: "150px" },
      cell: (info) => {
        const id = info.getValue()
        const fullPath = `/vacantes/detalle/${id}`
        return (
          <Link to={fullPath} className="text-blue-600 hover:underline">
            {id}
          </Link>
        )
      },
    }),
    columnHelper.accessor("title", {
      header: "Título",
      cell: (info) => info.getValue() ?? "---",
      meta: { align: "center" },
    }),
    columnHelper.accessor("original_title", {
      header: "Título Original",
      cell: (info) => toTitleCase(info.getValue()) ?? "---",
      meta: { align: "center" },
    }),
    columnHelper.accessor("country", {
      header: "País",
      cell: (info) => <span>{info.getValue()?.toUpperCase()}</span>,
      meta: {
        align: "center",
        variant: "select",
        label: "País",
        options: [
          { label: "USA", value: "usa" },
          { label: "Canada", value: "canada" },
        ],
      },
    }),
    columnHelper.accessor("location_state_province", {
      header: "Estado",
      meta: {
        align: "center",
        variant: "select",
        label: "Estado",
        options: mapToOptions(ALL_PROVINCES),
      },
    }),
    columnHelper.accessor("category", {
      header: "Categoría",
      meta: {
        align: "center",
        variant: "select",
        label: "Categoría",
        options: mapToOptions(VACANT_CATEGORIES),
      },
    }),
    columnHelper.accessor("rate", {
      header: "Sueldo",
      cell: (info) => {
        const rate = info.getValue()
        const currency = info.row.original.currency
        const rate_description = info.row.original.rate_description
        return (
          <span>{`$${rate} ${currency?.toUpperCase()}/${rate_description}`}</span>
        )
      },
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("positions", {
      header: "Posiciones",
      meta: { align: "center" },
    }),
    columnHelper.accessor("end_date", {
      header: "Vence",
      cell: (info) => formatDate(info.getValue()),
      meta: { align: "center" },
    }),
  ]
}
