import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { getReportOrdersColumns } from "@/components/customs/table/columns/reportOrdersColumns"
import { useGetReportsSalesAgent } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatCurrency } from "@/utils"
import { getDateKey } from "@/utils/calendarUtils"

export const useSalesAgentReport = ({ filters }) => {
  const { id: userId } = useCurrentUser()
  const [appliedFilters, setAppliedFilters] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

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
    setAppliedFilters(filters)
    setSelectedDate(null)
  }

  // Refetch whenever appliedFilters is set
  useEffect(() => {
    if (!appliedFilters) return
    refetch()
  }, [appliedFilters, refetch])

  const handleDayPressed = ({ date }) => {
    setSelectedDate(getDateKey(date))
  }

  const selectedDayData = useMemo(() => {
    return (
      reportData?.agent_daily_sales?.find(
        (entry) => getDateKey(new Date(entry.date)) === selectedDate
      ) ?? {}
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
