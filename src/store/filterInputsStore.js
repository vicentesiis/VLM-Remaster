import { create } from "zustand"

// Store for search input
export const useSearchStore = create((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}))

// Store for date range
export const useDateRangeStore = create((set) => ({
  dateRange: { from: null, to: null },
  setDateRange: (range) => set({ dateRange: range }),
}))

// Store for checkboxes
export const useCheckboxStore = create((set) => ({
  selectedValues: [],
  setSelectedValues: (newSelectedValues) =>
    set({ selectedValues: newSelectedValues }),
}))
