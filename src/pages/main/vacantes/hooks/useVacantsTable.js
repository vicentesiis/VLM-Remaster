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
        case "state":
          params.state = filter.value
          break
        case "category":
          params.category = filter.value
          break
        case "min_rate":
          params.min_rate = filter.value
          break
        case "max_rate":
          params.max_rate = filter.value
          break
        case "min_popularity":
          params.min_popularity = filter.value
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

  const { data, isFetched, isFetching, isError, refetch } = useGetVacants(
    queryParams,
    { enabled: false }
  )

  const table = useReactTable({
    data: data?.data ?? [],
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
    if (cleared) {
      setAppliedFilters([])
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      refetch()
    }
  }, [columnFilters, appliedFilters, refetch])

  useEffect(() => {
    refetch()
  }, [queryParams, refetch])

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
