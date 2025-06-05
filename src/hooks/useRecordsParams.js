import {
  useSearchStore,
  useDateRangeStore,
  useCheckboxStore,
} from "@/store/filterInputsStore"

export function useRecordsParams() {
  const { searchQuery } = useSearchStore()
  const { dateRange } = useDateRangeStore()
  const { selectedValues } = useCheckboxStore()

  return {
    group_id: "7d57f432-f831-43cd-9fcc-bd85ce51a7c4",
    nationality: null,
    // record_type: "lead",
    // channel: "facebook",
    // status: selectedValues?.[0],
    // skip: 0,
    // limit: 50,
    // search: searchQuery,
    // from: dateRange.from?.toISOString(),
    // to: dateRange.to?.toISOString(),
  }
}
