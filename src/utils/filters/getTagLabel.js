import { useCheckboxStore } from "@/store/filterInputsStore"
import { useDateRangeStore } from "@/store/filterInputsStore"

export const getTagLabel = (child) => {
  const { selectedValues } = useCheckboxStore.getState()
  const { dateRange } = useDateRangeStore.getState()

  if (child.props.title === "Estatus" && selectedValues.length > 0) {
    return `${selectedValues.length} `
  }

  if (
    child.props.title === "Rango de Fechas" &&
    (dateRange?.from || dateRange?.to)
  ) {
    return "Activo"
  }

  return null
}

export default getTagLabel