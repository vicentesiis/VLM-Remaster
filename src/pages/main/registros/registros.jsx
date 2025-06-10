import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import React, { useState, useEffect, useMemo, useCallback } from "react"
import { toast } from "sonner"

import PageLayout from "@/components/customs/layout/page-layout"
import { getRegistrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"
import { Roles } from "@/constants/appConstants"
import { useAuth } from "@/hooks"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { getParsedParams } from "@/utils/recordUtils"
import { extractList } from "@/utils/utils"

export const Registros = ({ title }) => {
  const { user } = useAuth()
  const role = user?.data?.role

  const isSuperAdmin = role === Roles.SUPER_ADMIN

  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const parsedParams = useMemo(() => {
    const baseParams = getParsedParams(pagination, appliedFilters, title, role)

    const isMissingGroupId =
      isSuperAdmin && !appliedFilters.find((f) => f.id === "group_id")?.value

    return isMissingGroupId ? null : baseParams
  }, [pagination, appliedFilters, title, role, isSuperAdmin])

  const { groups, channels, programs } = useCodexData(role, { enabled: true })

  const {
    data: records,
    status,
    isFetching,
    refetch,
  } = useGetRecords(parsedParams ?? {}, title, {
    enabled: !isSuperAdmin || parsedParams !== null,
    refetchOnWindowFocus: false,
  })

  // Reset applied filters when column filters are cleared
  useEffect(() => {
    const cleared = columnFilters.length === 0 && appliedFilters.length > 0
    if (cleared) {
      setAppliedFilters([])
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      refetch()
    }
  }, [columnFilters, appliedFilters, refetch])

  // Memoized table columns
  const columns = useMemo(() => {
    const cols = getRegistrosColumns(role, title)

    if (isSuperAdmin) {
      const groupList = extractList(groups)
      const channelList = extractList(channels)
      const programList = extractList(programs)

      if (groupList.length) {
        const groupOptions = groupList.map(({ id, name }) => ({
          label: name,
          value: id,
        }))
        const groupColumn = cols.find((col) => col.accessorKey === "group_id")
        if (groupColumn?.meta) groupColumn.meta.options = groupOptions
      }

      if (channelList.length) {
        const channelOptions = channelList.map((channel) => ({
          label: channel,
          value: channel,
        }))
        const channelColumn = cols.find((col) => col.accessorKey === "channel")
        if (channelColumn?.meta) channelColumn.meta.options = channelOptions
      }

      if (programList.length) {
        const programOptions = programList.map((program) => ({
          label: program,
          value: program,
        }))
        const programColumn = cols.find((col) => col.accessorKey === "program")
        if (programColumn?.meta) programColumn.meta.options = programOptions
      }
    }

    return cols
  }, [role, title, groups, channels, programs, isSuperAdmin])

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

  const hasFetched =
    status !== "loading" && status !== "error" && !!records?.data

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
  }, [columnFilters, refetch, isSuperAdmin])

  return (
    <PageLayout title={title}>
      <Card>
        <CardContent className="pt-4">
          <DataTable
            table={table}
            isLoading={status === "loading" || isFetching}
            isError={status === "error"}
            hasFetched={hasFetched}
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
