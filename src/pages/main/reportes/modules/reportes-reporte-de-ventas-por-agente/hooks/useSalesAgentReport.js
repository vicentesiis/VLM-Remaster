import { useQueryClient } from "@tanstack/react-query"
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { parseISO } from "date-fns"
import { useEffect, useMemo, useState } from "react"
import { getReportOrdersColumns } from "@/components/customs/table/columns/reportOrdersColumns"
import { useGetReportsSalesAgent } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { getDateKey } from "@/utils/calendarUtils"

export const useSalesAgentReport = ({ filters }) => {
  const { id: userId } = useCurrentUser()
  const [appliedFilters, setAppliedFilters] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const queryClient = useQueryClient()

  const queryParams = useMemo(() => {
    if (!appliedFilters?.month || !appliedFilters?.year) return null

    const { month, year, user_id } = appliedFilters
    const today = new Date()
    const monthIndex = Number(month) - 1
    const startDate = new Date(Number(year), monthIndex, 1)

    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    const endOfMonth = new Date(Number(year), monthIndex + 1, 0)
    const endDate = endOfMonth > tomorrow ? tomorrow : endOfMonth

    return {
      user_id: user_id ?? userId,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    }
  }, [appliedFilters])

  const {
    data: reportData,
    refetch,
    isFetching,
    isError,
    isFetched,
  } = useGetReportsSalesAgent(queryParams ?? {}, {
    enabled: false,
  })

  const handleSearch = async () => {
    queryClient.invalidateQueries({
      queryKey: ["sales-by-agent"],
    })
    setAppliedFilters(filters)
    setSelectedDate(null)
  }

  useEffect(() => {
    if (!appliedFilters) return
    refetch()
  }, [appliedFilters, refetch])

  const handleDayPressed = ({ date }) => {
    setSelectedDate(getDateKey(date))
  }

  const selectedDayData = useMemo(() => {
    return (
      reportData?.agent_daily_sales?.find((entry) => {
        const entryDate = parseISO(entry.date)
        return getDateKey(entryDate) === selectedDate
      }) ?? {}
    )
  }, [reportData, selectedDate])

  const columns = useMemo(() => getReportOrdersColumns(), [])

  const table = useReactTable({
    data: selectedDayData?.orders || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    appliedFilters,
    handleSearch,
    handleDayPressed,
    reportData,
    selectedDate,
    selectedDayData,
    isFetching,
    isError,
    isIdle: !isFetched,
    table,
  }
}
