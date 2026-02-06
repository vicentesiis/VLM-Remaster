import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const DEFAULT_PAGINATION = {
  pageIndex: 0,
  pageSize: 20,
}

const getInitialState = () => ({
  columnFilters: [],
  appliedFilters: [],
  pagination: { ...DEFAULT_PAGINATION },
})

const resolveUpdater = (updater, currentState) => {
  return typeof updater === "function" ? updater(currentState) : updater
}

export const useVacantesFiltersStore = create(
  persist(
    (set) => ({
      ...getInitialState(),
      setColumnFilters: (updater) =>
        set((state) => ({
          columnFilters: resolveUpdater(updater, state.columnFilters),
        })),
      setAppliedFilters: (updater) =>
        set((state) => ({
          appliedFilters: resolveUpdater(updater, state.appliedFilters),
        })),
      setPagination: (updater) =>
        set((state) => ({
          pagination: resolveUpdater(updater, state.pagination),
        })),
      resetFilters: () => set(getInitialState()),
    }),
    {
      name: "vacantes-filters",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
