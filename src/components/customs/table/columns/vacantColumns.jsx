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
    {
      ...createTextColumn(columnHelper, "positions", "Posiciones"),
      meta: { align: "center", maxWidth: "70px" },
    },
    createDateColumn(columnHelper, "end_date", "Vence"),
  ]
}
