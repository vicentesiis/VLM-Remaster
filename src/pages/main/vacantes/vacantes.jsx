import { SearchIcon } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import { useVacantsTable } from "./hooks/useVacantsTable"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { DataTable, DataTableToolbar } from "@/components/data-table"
import { Button, Card, CardContent } from "@/components/ui"

export const Vacantes = () => {
  const {
    table,
    selectedCountry,
    isFetched,
    isFetching,
    isError,
    columnFilters,
    setAppliedFilters,
    setPagination,
    refetch,
  } = useVacantsTable()

  const handleApplyFilters = () => {
    const requiredFilterIds = ["country", "category"]

    const missingFilter = requiredFilterIds.find(
      (id) =>
        !columnFilters.find(
          (f) =>
            f.id === id &&
            f.value !== undefined &&
            f.value !== null &&
            f.value !== ""
        )
    )

    if (missingFilter) {
      toast.error(
        "El país y la categoría son necesarios para hacer la búsqueda"
      )
      return
    }

    setAppliedFilters(columnFilters)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    requestAnimationFrame(() => refetch())
  }

  return (
    <PageLayout title="Vacantes">
      <Card>
        <CardContent className="pt-4 sm:pt-4">
          <DataTable
            key={selectedCountry}
            table={table}
            isLoading={isFetching}
            isError={isError}
            hasFetched={isFetched}
          >
            <DataTableToolbar table={table}>
              <Button onClick={handleApplyFilters} isLoading={isFetching}>
                <SearchIcon />
                Buscar
              </Button>
            </DataTableToolbar>
          </DataTable>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Vacantes
