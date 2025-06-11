import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import React, { useMemo, useState } from "react"
import { toast } from "sonner"

import PageLayout from "@/components/customs/layout/page-layout"
import { getRegistrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"

import { useIsSuperAdmin, useUserRole } from "@/hooks"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { getParsedParams } from "@/utils/recordUtils"
import { extractAndMapToOptions } from "@/utils/utils"

export const Registros = ({ title }) => {
  const currentRole = useUserRole()
  const isSuperAdmin = useIsSuperAdmin()

  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const parsedParams = useMemo(() => {
    const params = getParsedParams(
      pagination,
      appliedFilters,
      title,
      currentRole
    )
    if (
      isSuperAdmin &&
      !appliedFilters.find((f) => f.id === "group_id")?.value
    ) {
      return null
    }
    return params
  }, [appliedFilters, pagination, title, currentRole, isSuperAdmin])

  const { data, isFetched, isFetching, isError, refetch } = useGetRecords(
    parsedParams ?? {},
    title,
    {
      enabled: !isSuperAdmin || parsedParams !== null,
      refetchOnWindowFocus: false,
    }
  )

  const { groups, channels, programs, recordStatuses, recordTypes } =
    useCodexData(currentRole)

  const columns = useMemo(
    () =>
      getRegistrosColumns({
        role: currentRole,
        groups: extractAndMapToOptions(groups),
        channels: extractAndMapToOptions(channels),
        programs: extractAndMapToOptions(programs),
        recordStatuses: extractAndMapToOptions(recordStatuses),
        recordTypes: extractAndMapToOptions(recordTypes),
      }),
    [currentRole, groups, channels, programs, recordStatuses]
  )

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.total || 0) / pagination.pageSize),
    initialState: {
      columnVisibility: { group_id: false },
    },
  })

  const handleApplyFilters = () => {
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
  }

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
