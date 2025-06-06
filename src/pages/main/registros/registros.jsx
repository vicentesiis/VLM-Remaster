import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import React, { useState, useEffect } from "react"
import DataLoader from "@/components/customs/data-loader"
import PageLayout from "@/components/customs/layout/page-layout"
import { registrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { useDisplayStatus } from "@/hooks/useDisplayStatus"
import { useRecordsParams } from "@/hooks/useRecordsParams"

export const Registros = () => {
  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])

  const parsedParams = React.useMemo(() => {
    const params = {
      group_id: "7d57f432-f831-43cd-9fcc-bd85ce51a7c4",
      limit: 10, // or from elsewhere
    }

    for (const filter of columnFilters) {
      if (filter.id === "status") {
        params.status = filter.value[0]
      }

      if (filter.id === "created_at" && Array.isArray(filter.value)) {
        const [from, to] = filter.value
        if (from) params.from = new Date(from).toISOString()
        if (to) params.to = new Date(to).toISOString()
      }
    console.log(filter)
      // add more filters if needed...
    }



    return params
  }, [appliedFilters])

  const {
    data: records,
    status,
    isFetching,
    refetch,
  } = useGetRecords(parsedParams, { enabled: true })

  const displayStatus = useDisplayStatus(status, records?.data, isFetching)

  const table = useReactTable({
    data: records?.data || [],
    columns: registrosColumns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleApplyFilters = async () => {
    setAppliedFilters(columnFilters) // triggers new parsedParams
    await refetch() // performs the fetch
    setIsCollapsed(true)
  }

  return (
    <PageLayout title="Registros">
      <Card>
        <CardContent className="pt-4">
          {displayStatus === "success" ? (
            <DataTable table={table}>
              <DataTableToolbar table={table}>
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleApplyFilters}
                >
                  Buscar
                </Button>
              </DataTableToolbar>
            </DataTable>
          ) : (
            <DataLoader status={displayStatus} />
          )}
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Registros
