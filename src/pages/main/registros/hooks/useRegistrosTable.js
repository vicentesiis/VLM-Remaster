import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { getParsedRecordParams } from "../utils/getParsedRecordParams"
import { getRegistrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { RECORD_STATUSES_LABEL } from "@/constants/appConstants"
import { useGetGroups } from "@/hooks/queries"
import { useCodexData } from "@/hooks/queries/useCodexData"
import {
  useGetRecordsByCriteria,
  useGetRecordsByUser,
} from "@/hooks/queries/useRecord"
import { useGetTasks } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { mapToOptions } from "@/utils/utils"

export const useRegistrosTable = (title) => {
  const { id: userId, role, isSuperAdmin, isAgent } = useCurrentUser()

  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const parsedParams = useMemo(() => {
    if (title === "Tareas") {
      return null
    }

    if (
      isSuperAdmin &&
      !appliedFilters.find((f) => f.id === "group_id")?.value
    ) {
      return null
    }

    return getParsedRecordParams(
      pagination,
      appliedFilters,
      title,
      userId,
      role
    )
  }, [pagination, appliedFilters, title, userId, role, isSuperAdmin])

  // CHOOSE THE QUERY BASED ON TITLE
  let recordQuery

  if (title === "Tareas") {
    recordQuery = useGetTasks()
  } else if (isAgent) {
    recordQuery = useGetRecordsByUser(parsedParams)
  } else {
    recordQuery = useGetRecordsByCriteria(parsedParams, {
      enabled: !isSuperAdmin || parsedParams !== null,
    })
  }

  const { data, isFetched, isFetching, isError, refetch } = recordQuery

  const getStatusLabel = (status) => RECORD_STATUSES_LABEL[status] ?? status

  const groups = useGetGroups({ enabled: isSuperAdmin })
  const { channels, programs, recordTypes, recordStatuses } = useCodexData()

  const channelsOptions = mapToOptions(channels?.data)
  const programsOptions = mapToOptions(programs?.data)
  const recordTypesOptions = mapToOptions(recordTypes?.data)
  const recordStatusesOptions = mapToOptions(
    recordStatuses?.data,
    getStatusLabel
  )
  const groupsOptions = mapToOptions(groups?.data)

  const columns = useMemo(
    () =>
      getRegistrosColumns({
        role,
        groups: groupsOptions,
        channels: channelsOptions,
        programs: programsOptions,
        recordStatuses: recordStatusesOptions,
        recordTypes: recordTypesOptions,
        title,
      }),
    [role, groupsOptions, channelsOptions, programsOptions, recordTypesOptions, recordStatusesOptions, title]
  )

  const tableData = useMemo(() => {
    if (title === "Tareas") {
      return data?.data?.tasks ?? []
    }
    return data?.data ?? []
  }, [data, title])

  const table = useReactTable({
    data: tableData,
    columns,
    state: { columnFilters, pagination },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.total || 0) / pagination.pageSize),
    initialState: { columnVisibility: { group_id: false } },
    meta: {
      total: data?.total ?? 0,
      hasFetched: isFetched,
    },
  })

  useEffect(() => {
    const cleared = columnFilters.length === 0 && appliedFilters.length > 0
    if (cleared) {
      setAppliedFilters([])
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      requestAnimationFrame(() => refetch())
    }
  }, [columnFilters, appliedFilters, refetch])

  useEffect(() => {
    setColumnFilters([])
    setAppliedFilters([])
    setPagination({ pageIndex: 0, pageSize: 10 })
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
    showFilters: title !== "Tareas",
  }
}
