import React, { useState, useEffect, useRef } from "react"
import {
  groupConfig,
  yearConfig,
  monthConfig,
  channelConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent, CardSubTitle, CardTitle } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useCodexData } from "@/hooks/queries"
import { useGetGroupSalesReport } from "@/hooks/queries/UseReports"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import CalendarPage from "@/components/customs/date-range-picker/calendar"
import { formatCurrency, mapToOptions } from "@/utils"
import { useReportTable } from "../hooks/useReportsTable"
import { DataTable } from "@/components/data-table"
import { toast } from "sonner"
import { useLocation } from "react-router-dom"
import { months } from "@/constants"

const formatMonthYear = (year, month) =>
  new Date(year, month - 1).toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  })

export const ReportesReporteVentalMensual = () => {
  const { state } = useLocation()
  const stateRef = useRef(state || {})
  const { isAdmin, group } = useCurrentUser()
  const { channels } = useCodexData()
  const channelOptions = mapToOptions(channels.data)

  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isAdmin ? "" : stateRef.current.group_id || group?.id || "",
    year: stateRef.current.year?.toString() || "",
    month: stateRef.current.month?.toString() || "",
    channel: stateRef.current.channel || "",
  })

  const [searchParams, setSearchParams] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [autoLaunched, setAutoLaunched] = useState(false)

  const handleSearch = () => {
    const { year, month, channel, group_id } = values
    if (!year || !month || !channel || (!isAdmin && !group_id)) {
      toast.error("Todos los filtros son requeridos")
      return
    }

    setSearchParams({
      start_date: new Date(+year, +month - 1, 1).toISOString(),
      end_date: new Date(+year, +month, 0).toISOString(),
      calendarMonth: +month - 1,
      calendarYear: +year,
      channel,
      ...(isAdmin ? {} : { group_id }),
    })
    setSelectedDate(null)
  }

  useEffect(() => {
    const s = stateRef.current
    const match =
      s.year &&
      s.month &&
      s.channel &&
      s.group_id &&
      values.year === String(s.year) &&
      values.month === String(s.month) &&
      values.channel === s.channel &&
      values.group_id === s.group_id &&
      listOfGroups.length

    if (match && !autoLaunched) {
      handleSearch()
      setAutoLaunched(true)
    }
  }, [values, listOfGroups, autoLaunched])

  const { data, isLoading, isError } = useGetGroupSalesReport(
    searchParams || {},
    {
      enabled: !!searchParams,
    }
  )

  const ventas = data?.group_daily_sales ?? []
  const valores = Object.fromEntries(
    ventas
      .filter((v) => v.date)
      .map((v) => [v.date.split("T")[0], v.total_day_sales / 100])
  )

  const handleDayClick = (d, m, y) => {
    const dateStr = new Date(y, m, d).toISOString().split("T")[0]
    setSelectedDate(dateStr)
  }

  const selectedOrders =
    ventas.find((v) => v.date?.split("T")[0] === selectedDate)?.orders ?? []
  const { table } = useReportTable(selectedOrders)

  const isSearchMatching = () =>
    !!searchParams &&
    +searchParams.calendarMonth === +values.month - 1 &&
    +searchParams.calendarYear === +values.year &&
    searchParams.channel === values.channel &&
    (isAdmin || searchParams.group_id === values.group_id)

  const hasFetched = isSearchMatching()

  const renderCalendar = () =>
    searchParams?.calendarMonth != null &&
    searchParams?.calendarYear != null ? (
      <CalendarPage
        values={valores}
        onDayClick={handleDayClick}
        month={values.month}
        year={values.year}
      />
    ) : null

  const renderTable = () =>
    selectedDate ? (
      <div className="mt-8">
        <CardTitle className="mb-4">Órdenes del {selectedDate}</CardTitle>
        <DataTable table={table} showPagination={false} hasFetched />
      </div>
    ) : null

  return (
    <PageLayout title="Reporte de Ventas por Mes">
      <Card>
        <CardContent>
          <SectionHeader
            title="Ventas por mes "
            subtitle={
              searchParams ? formatMonthYear(values.year, values.month) : ""
            }
            extra={
              data?.total_sales != null
                ? `Total vendido: ${formatCurrency(data.total_sales)}`
                : ""
            }
            className="pb-6"
            actions={
              <FilterToolbar
                filterConfig={[
                  ...(listOfGroups.length ? [groupConfig] : []),
                  yearConfig,
                  monthConfig,
                  channelConfig,
                ]}
                values={{
                  ...values,
                  month:
                    months.find(
                      (m) => m.value === values.month.padStart(2, "0")
                    )?.value || values.month,
                }}
                onChange={onChange}
                context={{
                  groups: listOfGroups,
                  channels: channelOptions,
                  months,
                }}
                onSearch={handleSearch}
              />
            }
          />
          <WithStatusState
            isLoading={isLoading}
            isError={isError}
            hasFetched={hasFetched}
          >
            {renderCalendar()}
            {renderTable()}
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentalMensual
