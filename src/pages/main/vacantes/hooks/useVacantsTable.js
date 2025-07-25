import { useQueryClient } from "@tanstack/react-query"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { getParsedVacantParams } from "./getParsedVacantParams"
import { getVacantColumns } from "@/components/customs/table/columns/vacantColumns"
import { useCodexData } from "@/hooks/queries"
import { useGetVacants } from "@/hooks/queries/useVacants"
import { translateJobCategories } from "@/utils/utils"

export const useVacantsTable = () => {
  const queryClient = useQueryClient()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })
  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])

  const selectedCountry = useMemo(() => {
    return columnFilters.find((f) => f.id === "country")?.value ?? null
  }, [columnFilters])

  const parsedParams = useMemo(() => {
    return getParsedVacantParams(pagination, appliedFilters)
  }, [pagination, appliedFilters])

  const { countryStates, vacantCategories } = useCodexData()

  const columns = useMemo(() => {
    const translatedCategories = translateJobCategories(
      vacantCategories?.data?.data ?? []
    ).sort((a, b) => a.label.localeCompare(b.label))

    return getVacantColumns({
      selectedCountry,
      vacantCategories: translatedCategories,
      countryStates: countryStates?.data?.data ?? {},
    })
  }, [selectedCountry, vacantCategories?.data?.data, countryStates?.data?.data])

  const { data, isFetched, isFetching, isError, refetch } = useGetVacants(
    parsedParams,
    { enabled: parsedParams !== null }
  )

  const tableData = useMemo(() => {
    return parsedParams ? (data?.data ?? []) : []
  }, [data, parsedParams])

  const table = useReactTable({
    data: tableData,
    columns,
    state: { pagination, columnFilters },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
    pageCount: Math.ceil((data?.total ?? 0) / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      total: data?.total ?? 0,
      hasFetched: isFetched,
    },
    initialState: {
      columnVisibility: {
        country: false,
        category: false,
      },
    },
  })

  useEffect(() => {
    const cleared = columnFilters.length === 0 && appliedFilters.length > 0
    if (cleared) {
      setAppliedFilters([])
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      queryClient.removeQueries({ queryKey: ["vacants"] })
    }
  }, [columnFilters, appliedFilters])

  return {
    table,
    selectedCountry,
    isFetched,
    isFetching,
    isError,
    columnFilters,
    setAppliedFilters,
    setPagination,
    refetch,
  }
}
