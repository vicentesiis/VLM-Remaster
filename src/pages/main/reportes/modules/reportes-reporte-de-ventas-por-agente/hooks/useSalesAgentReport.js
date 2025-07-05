import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { getReportOrdersColumns } from "@/components/customs/table/columns/reportOrdersColumns"
import { useGetReportsSalesAgent } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatCurrency } from "@/utils"
import { getDateKey } from "@/utils/calendarUtils"
import { toast } from "sonner"

export const useSalesAgentReport = ({ filters }) => {
  const {
    isAgent,
    isAdmin,
    isLeader,
    isSuperAdmin,
    id: userId,
  } = useCurrentUser()
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

  const subtitle = useMemo(() => {
    if (!selectedDayData?.total_day_sales && !selectedDayData?.total_day_orders)
      return null

    return `Total del día: ${formatCurrency(
      selectedDayData.total_day_sales || 0
    )}\nÓrdenes: ${selectedDayData.total_day_orders || 0}`
  }, [selectedDayData])

  const totalSalesString = useMemo(() => {
    if (!reportData) return null
    return `Total mes: ${formatCurrency(reportData.total_sales || 0)}`
  }, [reportData])

  const monthSelected = useMemo(() => {
    const { month, year } = appliedFilters || {}
    if (!month || !year) return null

    const date = new Date(Number(year), Number(month) - 1)
    return new Intl.DateTimeFormat("es-MX", {
      month: "long",
      year: "numeric",
    }).format(date)
  }, [appliedFilters])

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
    subtitle,
    totalSalesString,
    monthSelected,
  }
}
