import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { getParsedRecordParams } from "../utils/getParsedRecordParams"
import { getColumnsForComponent } from "@/components/customs/table/columns/columnResolver"
import { RECORD_STATUSES_LABEL } from "@/constants/appConstants"
import { useGetGroups } from "@/hooks/queries"
import { useCodexData } from "@/hooks/queries/useCodexData"
import {
  useGetRecordsByCriteria,
  useGetRecordsByUser,
} from "@/hooks/queries/useRecord"
import { useGetTasks } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { componentPropsMap } from "@/routes/route-props"
import { mapToOptions } from "@/utils/utils"

export const useRegistrosTable = (title, componentType = null) => {
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

  // Determine component type for column resolution
  const resolvedComponentType = useMemo(() => {
    // If componentType is explicitly provided, use it
    if (componentType) {
      return componentType
    }
    
    // Try to find component type from route configuration based on title
    const routeEntry = Object.entries(componentPropsMap).find(
      ([, props]) => props.title === title
    )
    
    if (routeEntry) {
      const [routeKey, props] = routeEntry
      return props.columnType || routeKey
    }
    
    // Fallback: derive from title
    const titleToComponentMap = {
      "Registros": "registros",
      "Prospectos": "prospectos", 
      "Leads": "leads",
      "Clientes": "clientes",
      "Tareas": "tareas"
    }
    
    return titleToComponentMap[title] || "registros"
  }, [title, componentType])

  const columns = useMemo(
    () => {
      const columnOptions = {
        role,
        groups: groupsOptions,
        channels: channelsOptions,
        programs: programsOptions,
        recordStatuses: recordStatusesOptions,
        recordTypes: recordTypesOptions,
        title,
      }
      
      return getColumnsForComponent(resolvedComponentType, columnOptions)
    },
    [resolvedComponentType, role, groupsOptions, channelsOptions, programsOptions, recordTypesOptions, recordStatusesOptions, title]
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
