import {
  columnHelper,
  createDateColumn,
  createIdLinkColumn,
  createTitleColumn,
  createTextColumn,
  createRateColumn
} from "./shared/commonColumns"
import { mapToOptions } from "@/utils"

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
    createIdLinkColumn(columnHelper, "id", "ID", "/vacantes/detalle"),
    createTitleColumn(columnHelper, "original_title", "Título Original", true),
    createTitleColumn(columnHelper, "title", "Título"),
    columnHelper.accessor("country", {
      header: "País",
      meta: {
        hidden: true,
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
      meta: {
        hidden: true,
        variant: "select",
        label: "Categoría",
        options: vacantCategories,
      },
    }),
    {
      ...createTextColumn(columnHelper, "location_state_province", "Estado"),
      meta: {
        align: "center",
        variant: "select",
        label: "Estado",
        options: provinceOptions,
      },
    },
    createRateColumn(columnHelper, "rate", "Sueldo", "currency", "rate_description"),
    {
      ...createTextColumn(columnHelper, "positions", "Posiciones"),
      meta: { align: "center", maxWidth: "70px" },
    },
    createDateColumn(columnHelper, "end_date", "Vence"),
  ]
}
