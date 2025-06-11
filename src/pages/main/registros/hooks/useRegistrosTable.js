import React from "react"
import { useMemo, useState } from "react"
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { getParsedRecordParams } from "../utils/getParsedRecordParams"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { extractAndMapToOptions } from "@/utils/utils"
import { getRegistrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { useIsSuperAdmin, useUserRole } from "@/hooks"

export const useRegistrosTable = (title) => {
  const currentRole = useUserRole()
  const isSuperAdmin = useIsSuperAdmin()

  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const parsedParams = useMemo(() => {
    const params = getParsedRecordParams(
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
    state: { columnFilters, pagination },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.total || 0) / pagination.pageSize),
    initialState: { columnVisibility: { group_id: false } },
  })

  return {
    table,
    isFetching,
    isError,
    isFetched,
    columnFilters,
    setColumnFilters,
    setAppliedFilters,
    setPagination,
    refetch,
    isSuperAdmin,
  }
}
