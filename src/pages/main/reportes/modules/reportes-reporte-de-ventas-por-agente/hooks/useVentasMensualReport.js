import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useState, useMemo, useEffect } from "react"
import { getReportOrdersColumns } from "@/components/customs/table/columns/reportOrdersColumns"
import { useGetGroupSalesReport } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatCurrency } from "@/utils"
import { getDateKey } from "@/utils/calendarUtils"
import { formatMonthNYear } from "@/utils/reportFormatters"

export const useSalesMonthlyReport = ({ filters }) => {
  const { isAdmin } = useCurrentUser()
  const [appliedFilters, setAppliedFilters] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const queryParams = useMemo(() => {
    if (!appliedFilters?.year || !appliedFilters?.month) return null

    const { year, month, channel, group_id } = appliedFilters
    const startDate = new Date(+year, +month - 1, 1)
    const endDate = new Date(+year, +month, 0)

    return {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      calendarMonth: +month - 1,
      calendarYear: +year,
      channel,
      ...(isAdmin ? {} : { group_id }),
    }
  }, [appliedFilters])

  const { data, refetch, isFetching, isError, isFetched } =
    useGetGroupSalesReport(queryParams ?? {}, {
      enabled: false,
    })

  const handleSearch = () => {
    setAppliedFilters(filters)
    setSelectedDate(null)
  }

  useEffect(() => {
    if (!appliedFilters) return
    refetch()
  }, [appliedFilters, refetch])

  const ventas = data?.group_daily_sales ?? []

  const calendarData = useMemo(() => {
    return ventas
      .filter((v) => v.date)
      .map((v) => ({
        date: v.date,
        total_day_sales: v.total_day_sales,
        total_day_orders: v.total_day_orders,
      }))
  }, [ventas])

  const handleDayPressed = ({ date }) => {
    setSelectedDate(getDateKey(date))
  }

  const selectedDayData = useMemo(() => {
    return (
      ventas.find((v) => getDateKey(new Date(v.date)) === selectedDate) ?? {}
    )
  }, [ventas, selectedDate])

  const subtitle = useMemo(() => {
    if (!selectedDayData?.total_day_sales && !selectedDayData?.total_day_orders)
      return null

    return `Total del día: ${formatCurrency(selectedDayData.total_day_sales || 0, 'USD')}\nÓrdenes: ${selectedDayData.total_day_orders || 0}`
  }, [selectedDayData])

  const totalSalesString = useMemo(() => {
    if (!data) return null
    return formatCurrency(data.total_sales || 0, 'USD')
  }, [data])

  const monthSelected = useMemo(() => {
    const { month, year } = appliedFilters || {}
    if (!month || !year) return null

    return formatMonthNYear(month, year)
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
    reportData: data,
    selectedDate,
    selectedDayData,
    isFetching,
    isError,
    isIdle: !isFetched,
    table,
    subtitle,
    totalSalesString,
    monthSelected,
    calendarData: calendarData,
  }
}
