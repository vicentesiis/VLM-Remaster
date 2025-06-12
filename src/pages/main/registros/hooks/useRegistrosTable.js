import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { use, useEffect, useMemo, useState } from "react"
import { getParsedRecordParams } from "../utils/getParsedRecordParams"
import { getRegistrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { recordStatusesLabel } from "@/constants/appConstants"
import { Roles } from "@/constants/appConstants"
import { useIsSuperAdmin, useUserId, useUserRole } from "@/hooks"
import { useCodexData } from "@/hooks/queries/useCodexData"
import {
  useGetRecordsByCriteria,
  useGetRecordsByUser,
} from "@/hooks/queries/useRecord"
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
      userId,
      currentRole
    )
    if (
      isSuperAdmin &&
      !appliedFilters.find((f) => f.id === "group_id")?.value
    ) {
      return null
    }
    return params
  }, [appliedFilters, pagination, title, isSuperAdmin])

  const codex = useCodexData(currentRole)
  const recordQuery =
    currentRole === Roles.AGENT
      ? useGetRecordsByUser(parsedParams, {
          refetchOnWindowFocus: false,
        })
      : useGetRecordsByCriteria(parsedParams, {
          enabled: !isSuperAdmin || parsedParams !== null,
          refetchOnWindowFocus: false,
        })

  const { data, isFetched, isFetching, isError, refetch } = recordQuery

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

  useEffect(() => {
    const cleared = columnFilters.length === 0 && appliedFilters.length > 0
    if (cleared) {
      setAppliedFilters([])
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      refetch()
    }
  }, [columnFilters, appliedFilters, refetch])

  useEffect(() => {
    setColumnFilters([])
    setAppliedFilters([])
    setPagination({ pageIndex: 0, pageSize: 10 })
    if (currentRole === Roles.AGENT) {
      refetch()
    }
  }, [title])

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
