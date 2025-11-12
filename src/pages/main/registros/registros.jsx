import { SearchIcon } from "lucide-react"
import PropTypes from "prop-types"
import React, { useCallback } from "react"
import { toast } from "sonner"
import { useRegistrosTable } from "./hooks/useRegistrosTable"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"

export const Registros = ({ title, columnType }) => {
  const {
    table,
    isFetching,
    isError,
    isFetched,
    columnFilters,
    setAppliedFilters,
    setPagination,
    refetch,
    isSuperAdmin,
    showFilters,
    tableKey,
  } = useRegistrosTable(title, columnType)

  const handleApplyFilters = useCallback(() => {
    if (
      isSuperAdmin &&
      !columnFilters.find((f) => f.id === "group_id")?.value
    ) {
      toast.error("Primero selecciona un grupo para buscar")
      return
    }

    setAppliedFilters(columnFilters)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    requestAnimationFrame(() => refetch())
  }, [isSuperAdmin, columnFilters, setAppliedFilters, setPagination, refetch])

  return (
    <PageLayout title={title}>
      <Card>
        <CardContent className="sm:pt-4 pt-4">
          <DataTable
            key={tableKey}
            table={table}
            isLoading={isFetching}
            isError={isError}
            hasFetched={isFetched}
            showPagination={showFilters}
          >
            {showFilters && (
              <DataTableToolbar table={table}>
                <Button onClick={handleApplyFilters} isLoading={isFetching}>
                  <SearchIcon />
                  Buscar
                </Button>
              </DataTableToolbar>
            )}
          </DataTable>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Registros

Registros.propTypes = {
  title: PropTypes.string,
  columnType: PropTypes.string,
}
