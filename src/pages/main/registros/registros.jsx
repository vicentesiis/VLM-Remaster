import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import React, { useCallback } from "react"
import { toast } from "sonner"

import PageLayout from "@/components/customs/layout/page-layout"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"

import { useIsSuperAdmin, useUserRole } from "@/hooks"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { useRegistroColumns } from "@/hooks/useRegistroColumns"
import { useRegistroFilters } from "@/hooks/useRegistroFilter"

export const Registros = ({ title }) => {
  const currentRole = useUserRole()
  const isSuperAdmin = useIsSuperAdmin()

  const {
    columnFilters,
    setColumnFilters,
    setAppliedFilters,
    pagination,
    setPagination,
    parsedParams,
  } = useRegistroFilters(title, currentRole, isSuperAdmin)

  const { groups, channels, programs } = useCodexData(currentRole, {
    enabled: true,
  })

  const {
    data: records,
    isFetched,
    isFetching,
    isError,
    refetch,
  } = useGetRecords(parsedParams ?? {}, title, {
    enabled: !isSuperAdmin || parsedParams !== null,
    refetchOnWindowFocus: false,
  })

  const columns = useRegistroColumns(
    currentRole,
    title,
    isSuperAdmin,
    groups,
    channels,
    programs
  )

  const table = useReactTable({
    data: records?.data || [],
    columns,
    state: { columnFilters, pagination },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((records?.total || 0) / pagination.pageSize),
    initialState: {
      columnVisibility: { group_id: false },
    },
  })

  const handleApplyFilters = useCallback(() => {
    if (
      isSuperAdmin &&
      !columnFilters.find((f) => f.id === "group_id")?.value
    ) {
      toast.error("Primero selecciona un grupo para buscar")
      return
    }

    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    setAppliedFilters(columnFilters)
    requestAnimationFrame(() => refetch())
  }, [columnFilters, refetch])

  return (
    <PageLayout title={title}>
      <Card>
        <CardContent className="pt-4">
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
