import React from "react"
import { useVacantsTable } from "./hooks/useVacantsTable"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { DataTable, DataTableToolbar } from "@/components/data-table"
import { Button, Card, CardContent } from "@/components/ui"

export const Vacantes = () => {
  const {
    table,
    isFetched,
    isFetching,
    isError,
    columnFilters,
    setAppliedFilters,
    setPagination,
    refetch,
  } = useVacantsTable()

  const handleApplyFilters = () => {
    setAppliedFilters(columnFilters)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    requestAnimationFrame(() => refetch())
  }

  return (
    <PageLayout title="Vacantes">
      <Card>
        <CardContent>
          <DataTable
            table={table}
            isLoading={isFetching}
            isError={isError}
            hasFetched={isFetched}
          >
            <DataTableToolbar table={table}>
              <Button size="sm" onClick={handleApplyFilters}>
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
