import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import React, { useState, useEffect } from "react"
import PageLayout from "@/components/customs/layout/page-layout"
import { getRegistrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks"
import { useGetGroups } from "@/hooks/queries/useGroup"
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
    return getParsedParams(pagination, appliedFilters, title, role)
  }, [pagination, appliedFilters, title, role])

  const {
    data: records,
    status,
    isFetching,
    refetch,
  } = useGetRecords(parsedParams, title, {
    enabled: role !== "super_admin",
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

  const { data: groups } = useGetGroups({
    enabled: role === "super_admin",
  })

  const columns = React.useMemo(() => {
    const cols = getRegistrosColumns(role, title)

    if (role === "super_admin" && groups?.data?.length) {
      const groupOptions = groups.data?.map((group) => ({
        label: group.name,
        value: group.id,
      }))
      const groupColumn = cols.find((col) => col.accessorKey === "group_id")
      if (groupColumn?.meta) {
        groupColumn.meta.options = groupOptions
      }
    }
    return cols
  }, [role, title, groups])

  const table = useReactTable({
    data: records?.data || [],
    columns: columns,
    state: {
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((records?.total || 0) / pagination.pageSize),
    initialState: {
      columnVisibility: {
        group_id: false,
      },
    },
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

  const hasFetched =
    status !== "loading" && status !== "error" && records?.data !== undefined

  return (
    <PageLayout title={title}>
      <Card>
        <CardContent className="pt-4">
          {console.log(status === "error")}

          <DataTable
            key={groups?.data?.length}
            table={table}
            isLoading={status === "loading" || isFetching}
            isError={status === "error"}
            hasFetched={hasFetched}
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
