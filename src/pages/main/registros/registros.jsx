import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import React, { useState, useEffect } from "react"
import PageLayout from "@/components/customs/layout/page-layout"
import { registrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { getParsedParams } from "@/utils/recordUtils"

export const Registros = ({ title }) => {
  const { user } = useAuth()
  const role = user?.data?.role

  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const parsedParams = React.useMemo(() => {
    return getParsedParams(pagination, appliedFilters, role)
  }, [pagination, appliedFilters, role])

  useEffect(() => {
    const filtersWereCleared =
      columnFilters.length === 0 && appliedFilters.length > 0

    if (filtersWereCleared) {
      setAppliedFilters([])
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      refetch()
    }
  }, [columnFilters])

  const {
    data: records,
    status,
    isFetching,
    refetch,
  } = useGetRecords(parsedParams, title, {
    enabled: true,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const filtersWereCleared =
      columnFilters.length === 0 && appliedFilters.length > 0

    if (filtersWereCleared) {
      setAppliedFilters([])
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      refetch()
    }
  }, [columnFilters])

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
    manualPagination: true,
    pageCount: Math.ceil((records?.total || 0) / pagination.pageSize),
  })

  const handleApplyFilters = async () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }))
    setAppliedFilters(columnFilters)
    requestAnimationFrame(() => {
      refetch()
    })
  }

  return (
    <PageLayout title={title}>
      <Card>
        <CardContent className="pt-4">
          <DataTable
            table={table}
            isLoading={status === "loading" || isFetching}
            isError={status === "error"}
          >
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
