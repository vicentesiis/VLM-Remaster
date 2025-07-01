import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { Link } from "react-router-dom"
import NullableCell from "../cells/nullable-cell"
import { formatDate } from "@/utils"
import { mapToOptions, toTitleCase } from "@/utils"

const columnHelper = createColumnHelper()

export const getVacantColumns = ({
  selectedCountry,
  vacantCategories = [],
  countryStates = {},
}) => {
  const selected = Array.isArray(selectedCountry)
    ? selectedCountry[0]
    : selectedCountry

  const provinceOptions =
    mapToOptions(countryStates[selected?.toUpperCase()]) || []

  return [
    columnHelper.accessor("id", {
      header: "ID",
      meta: { align: "center", maxWidth: "100px" },
      cell: (info) => {
        const id = info.getValue()
        return id ? (
          <Link
            to={`/vacantes/detalle/${id}`}
            className="truncate font-mono text-primary hover:underline"
          >
            {id}
          </Link>
        ) : (
          <NullableCell value={null} />
        )
      },
    }),
    columnHelper.accessor("original_title", {
      header: "Título Original",
      cell: (info) => <NullableCell value={toTitleCase(info.getValue())} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("title", {
      header: "Título",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
    columnHelper.accessor("country", {
      header: "País",
      cell: (info) => <NullableCell value={info.getValue()} />,
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
    columnHelper.accessor("category", {
      header: "Categoría",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: {
        align: "center",
        variant: "select",
        label: "Categoría",
        options: mapToOptions(vacantCategories),
      },
    }),
    columnHelper.accessor("location_state_province", {
      header: "Estado",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: {
        align: "center",
        variant: "select",
        label: "Estado",
        options: provinceOptions,
      },
    }),
    columnHelper.accessor("rate", {
      header: "Sueldo",
      cell: (info) => {
        const rate = info.getValue()
        const currency = info.row.original.currency
        const rateDesc = info.row.original.rate_description
        return rate ? (
          <span className="text-muted-foreground">{`$${rate} ${currency?.toUpperCase()}/${rateDesc}`}</span>
        ) : (
          <NullableCell value={null} />
        )
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("positions", {
      header: "Posiciones",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center", maxWidth: "70px" },
    }),
    columnHelper.accessor("end_date", {
      header: "Vence",
      cell: (info) => {
        const date = info.getValue()
        return <NullableCell value={date ? formatDate(date) : null} />
      },
      meta: { align: "center" },
    }),
  ]
}
