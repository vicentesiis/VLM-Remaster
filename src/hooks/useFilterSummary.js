import {
  useSearchStore,
  useDateRangeStore,
  useCheckboxStore,
} from "@/store/filterInputsStore"

export function useFilterSummary() {
  const { searchQuery, setSearchQuery } = useSearchStore()
  const { dateRange, setDateRange } = useDateRangeStore()
  const { selectedValues, setSelectedValues } = useCheckboxStore()

  const hasSearch = searchQuery.trim() !== ""
  const hasDateRange = Boolean(dateRange.from || dateRange.to)
  const hasCheckboxes = selectedValues.length > 0

  const summaryTags = []

  if (hasCheckboxes) summaryTags.push(`${selectedValues.length} seleccionados`)
  if (hasDateRange) summaryTags.push("Rango de fechas")

  const hasFilters = hasSearch || hasDateRange || hasCheckboxes

  const resetFilters = () => {
    setSearchQuery("")
    setDateRange({ from: null, to: null })
    setSelectedValues([])
  }

  return { summaryTags, hasFilters, resetFilters }
}
