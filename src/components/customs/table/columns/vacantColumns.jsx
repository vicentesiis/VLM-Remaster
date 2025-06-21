import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { ALL_PROVINCES, VACANT_CATEGORIES } from "@/constants"
import { formatDate } from "@/lib"
import { formatCurrency, mapToOptions } from "@/utils"

const columnHelper = createColumnHelper()

export const getVacantColumns = () => {
  const urlColumn = columnHelper.display({
    id: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.original.url
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          Link
        </a>
      )
    },
    meta: { align: "center", maxWidth: "80px" },
  })

  return [
    columnHelper.accessor("id", {
      header: "ID",
      meta: { align: "center", maxWidth: "200px" },
    }),
    columnHelper.accessor("title", {
      header: "Título",
      meta: { align: "left" },
    }),
    columnHelper.accessor("original_title", {
      header: "Título Original",
      meta: { align: "left" },
    }),
    columnHelper.accessor("employer_name", {
      header: "Empleador",
      meta: { align: "left" },
    }),
    columnHelper.accessor("country", {
      header: "País",
      cell: (info) => <span>{info.getValue()?.toUpperCase()}</span>,
      meta: {
        align: "center",
        variant: "select", // Tipo de filtro
        label: "País",
        options: [
          // Opciones fijas en frontend
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
        const value = info.getValue()
        const multiplied = value
        return formatCurrency(multiplied, info.row.original.currency)
      },
      meta: {
        align: "center",
        variant: "range", // Puedes implementar un filtro rango para min_rate / max_rate
        label: "Sueldo",
      },
    }),
    columnHelper.accessor("visa_class", {
      header: "Visa",
      meta: { align: "center" },
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
    urlColumn,
  ]
}
