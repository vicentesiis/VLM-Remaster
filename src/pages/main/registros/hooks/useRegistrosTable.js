import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { getParsedRecordParams } from "../utils/getParsedRecordParams"
import { getRegistrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { recordStatusesLabel } from "@/constants/appConstants"
import { useIsSuperAdmin, useUserId, useUserRole } from "@/hooks"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { extractAndMapToOptions } from "@/utils/utils"

export const useRegistrosTable = (title) => {
  const userId = useUserId()
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
      currentRole,
      isSuperAdmin
    )
    if (
      isSuperAdmin &&
      !appliedFilters.find((f) => f.id === "group_id")?.value
    ) {
      return null
    }
    return params
  }, [appliedFilters, pagination, title, currentRole, isSuperAdmin])

  const codex = useCodexData(currentRole)
  const { data, isFetched, isFetching, isError, refetch } = useGetRecords(
    parsedParams ?? {},
    title,
    currentRole,
    userId,
    {
      enabled: !isSuperAdmin || parsedParams !== null,
      refetchOnWindowFocus: false,
    }
  )

  const getStatusLabel = (status) => recordStatusesLabel[status] ?? status

  const columns = useMemo(
    () =>
      getRegistrosColumns({
        role: currentRole,
        groups: extractAndMapToOptions(codex.groups),
        channels: extractAndMapToOptions(codex.channels),
        programs: extractAndMapToOptions(codex.programs),
        recordStatuses: extractAndMapToOptions(
          codex.recordStatuses,
          getStatusLabel
        ),
        recordTypes: extractAndMapToOptions(codex.recordTypes),
      }),
    [currentRole, codex]
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
