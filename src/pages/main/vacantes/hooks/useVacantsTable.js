import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { getVacantColumns } from "@/components/customs/table/columns/vacantColumns"
import { useCodexData } from "@/hooks/queries"
import { useGetVacants } from "@/hooks/queries/useVacants"

export const useVacantsTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])

  const selectedCountry = useMemo(() => {
    return columnFilters.find((f) => f.id === "country")?.value ?? null
  }, [columnFilters])

  const queryParams = useMemo(() => {
    const params = {
      skip: pagination.pageIndex * pagination.pageSize,
      limit: pagination.pageSize,
    }

    appliedFilters.forEach((filter) => {
      switch (filter.id) {
        case "country":
          params.country = filter.value
          break
        case "location_state_province":
          params.state = filter.value
          break
        case "category":
          params.category = filter.value
          break
        default:
          break
      }
    })

    return params
  }, [pagination, appliedFilters])

  const { countryStates, vacantCategories } = useCodexData()

  const columns = useMemo(() => {
    return getVacantColumns({
      selectedCountry,
      vacantCategories: vacantCategories?.data ?? [],
      countryStates: countryStates?.data?.data ?? {},
    })
  }, [selectedCountry, vacantCategories?.data, countryStates?.data?.data])

  const isReadyToFetch = useMemo(() => {
    const requiredFilters = ["country", "location_state_province", "category"]
    return requiredFilters.every((key) =>
      appliedFilters.find((f) => f.id === key && f.value)
    )
  }, [appliedFilters])

  const { data, isFetched, isFetching, isError, refetch } = useGetVacants(
    queryParams,
    { enabled: isReadyToFetch }
  )

  const tableData = useMemo(() => {
    return isReadyToFetch ? (data?.data ?? []) : []
  }, [data, isReadyToFetch])

  const table = useReactTable({
    data: tableData,
    columns,
    state: { pagination, columnFilters },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
    pageCount: Math.ceil((data?.total ?? 0) / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    const cleared = columnFilters.length === 0 && appliedFilters.length > 0
    console.log("cleared", cleared)
    if (cleared) {
      setAppliedFilters([])
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    }
  }, [columnFilters, appliedFilters, refetch])

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
