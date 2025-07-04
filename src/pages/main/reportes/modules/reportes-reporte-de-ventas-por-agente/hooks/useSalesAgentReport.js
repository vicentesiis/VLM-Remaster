import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { getReportOrdersColumns } from "@/components/customs/table/columns/reportOrdersColumns"
import { useGetReportsSalesAgent } from "@/hooks/queries/UseReports"
import { formatCurrency } from "@/utils"
import { getDateKey } from "@/utils/calendarUtils"

export const useSalesAgentReport = ({ filters, userId }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [reportData, setReportData] = useState(null)

  const { user_id, month, year } = filters

  const queryParams = useMemo(() => {
    if (!month || !year) return null

    const today = new Date()
    const monthIndex = Number(month) - 1
    const startDate = new Date(Number(year), monthIndex, 1)

    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    const endOfMonth = new Date(Number(year), monthIndex + 1, 0)
    const endDate = endOfMonth > tomorrow ? tomorrow : endOfMonth

    return {
      user_id: user_id || userId,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    }
  }, [userId, user_id, month, year])

  const { refetch, isFetching, isError } = useGetReportsSalesAgent(
    queryParams ?? {},
    { enabled: false }
  )

  const handleSearch = async () => {
    if (!queryParams) return
    const res = await refetch()
    setReportData(res.data?.data || null)
  }

  const handleDayPressed = ({ date }) => {
    setSelectedDate(getDateKey(date))
  }

  // Get summary + orders for selected day
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

    return `Total del día: ${formatCurrency(selectedDayData.total_day_sales || 0)} - Número de Órdenes: ${selectedDayData.total_day_orders || 0}`
  }, [selectedDayData])

  const columns = useMemo(() => getReportOrdersColumns(), [])

  const table = useReactTable({
    data: selectedDayData?.orders || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    filters,
    handleSearch,
    handleDayPressed,
    reportData,
    selectedDate,
    selectedDayData,
    subtitle,
    isFetching,
    isError,
    table,
  }
}
