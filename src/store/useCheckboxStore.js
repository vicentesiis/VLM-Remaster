import { create } from "zustand"

export const useCheckboxStore = create((set) => ({
  selectedValues: [],
  setSelectedValues: (newSelectedValues) =>
    set({ selectedValues: newSelectedValues }),
}))
