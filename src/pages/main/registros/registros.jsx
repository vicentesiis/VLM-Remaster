import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import React, { useState } from "react"
import DataLoader from "@/components/customs/data-loader"
import PageLayout from "@/components/customs/layout/page-layout"
import { registrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { useDisplayStatus } from "@/hooks/useDisplayStatus"

export const Registros = () => {
  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, // or default limit
  })

  const parsedParams = React.useMemo(() => {
    const params = {
      group_id: "7d57f432-f831-43cd-9fcc-bd85ce51a7c4",
      skip: pagination.pageIndex * pagination.pageSize,
      limit: pagination.pageSize,
    }

    for (const filter of appliedFilters) {
      if (filter.id === "status") {
        params.status = filter.value[0]
      }

      if (filter.id === "created_at" && Array.isArray(filter.value)) {
        const [from, to] = filter.value
        if (from) params.from = new Date(from).toISOString()
        if (to) params.to = new Date(to).toISOString()
      }
    }

    return params
  }, [pagination, appliedFilters])

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
      pagination,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // important
    pageCount: Math.ceil((records?.total || 0) / pagination.pageSize), // optional if you return total
  })

  const handleApplyFilters = async () => {
    // Reset to page 0
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }))

    // Set filters
    setAppliedFilters(columnFilters)

    // Optional: wait until next render to ensure pagination is updated
    requestAnimationFrame(() => {
      refetch()
      setIsCollapsed(true)
    })
  }

  return (
    <PageLayout title="Registros">
      <Card>
        <CardContent className="pt-4">
          <DataTable table={table}>
            <DataTableToolbar table={table}>
              <Button size="sm" variant="default" onClick={handleApplyFilters}>
                Buscar
              </Button>
            </DataTableToolbar>
          </DataTable>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Registros
