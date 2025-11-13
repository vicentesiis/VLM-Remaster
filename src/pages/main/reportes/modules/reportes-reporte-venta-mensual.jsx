import React, { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useSalesMonthlyReport } from "./reportes-reporte-de-ventas-por-agente/hooks/useVentasMensualReport"
import BigCalendar from "@/components/customs/big-calendar/big-calendar"
import {
  groupConfig,
  yearConfig,
  monthConfig,
  channelConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { DataTable } from "@/components/data-table"
import { Card, CardContent } from "@/components/ui"
import { months } from "@/constants"
import { useCodexData } from "@/hooks/queries"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { getCurrentMonthYear, mapToOptions } from "@/utils"
import { formatCurrency } from "@/utils"
import { formatIfExists, formatLongMonthAndDay } from "@/utils/reportFormatters"

const HeaderSection = ({
  filters,
  onChange,
  handleSearch,
  listOfGroups,
  monthSelected,
  totalSalesString,
  totalOrdersString,
  isFetching,
  channelOptions,
  isIdle,
}) => (
  <SectionHeader
    title={monthSelected}
    extra={totalSalesString}
    subtitle={totalOrdersString}
    emptyMessage={isIdle ? "Aplica filtros para generar el reporte" : ""}
    className="pb-6"
    actions={
      <FilterToolbar
        filterConfig={[
          ...(listOfGroups.length ? [groupConfig] : []),
          channelConfig,
          yearConfig,
          monthConfig,
        ]}
        values={{
          ...filters,
          month:
            months.find((m) => m.value === filters.month.padStart(2, "0"))
              ?.value || filters.month,
        }}
        onChange={onChange}
        context={{ groups: listOfGroups, channels: channelOptions, months }}
        onSearch={handleSearch}
        isLoading={isFetching}
      />
    }
  />
)

const CalendarSection = ({
  filters,
  reportData,
  handleDayPressed,
  selectedDate,
}) => {
  if (!reportData?.group_daily_sales) return null

  return (
    <BigCalendar
      month={filters.month}
      year={filters.year}
      data={reportData.group_daily_sales}
      onClick={handleDayPressed}
      selectedDate={selectedDate}
    />
  )
}

const SalesTableSection = ({ selectedDate, selectedDayData, table }) => {
  if (!selectedDate) return null

  const totalSales = formatIfExists(
    selectedDayData?.total_day_sales,
    formatCurrency
  )

  const totalOrders = formatIfExists(
    selectedDayData?.total_day_orders,
    (n) => `${n} Órdenes`
  )

  const formattedDate = formatLongMonthAndDay(selectedDate)

  return (
    <div>
      <SectionHeader
        title={formattedDate}
        extra={totalSales}
        subtitle={totalOrders}
        className="mt-4"
      />

      <DataTable
        table={table}
        hasFetched={!!table?.getRowModel().rows?.length}
        showPagination={false}
      />
    </div>
  )
}

export const NavigateSection = ({ filters, onSearch, listOfGroups }) => {
  const { state } = useLocation()
  const stateRef = useRef(state || {})
  const autoLaunchedRef = useRef(false)

  useEffect(() => {
    const s = stateRef.current

    const isValidSearch =
      s.year &&
      s.month &&
      s.channel &&
      s.group_id &&
      filters.year === String(s.year) &&
      filters.month === String(s.month) &&
      filters.channel === s.channel &&
      filters.group_id === s.group_id &&
      listOfGroups.length > 0

    if (isValidSearch && !autoLaunchedRef.current) {
      onSearch()
      autoLaunchedRef.current = true
    }
  }, [filters, listOfGroups, onSearch])

  return null
}

export const ReportesReporteVentalMensual = () => {
  const { isAdmin, isLeader, group } = useCurrentUser()
  const { channels } = useCodexData()
  const channelOptions = mapToOptions(channels.data)
  const { state } = useLocation()
  const stateRef = useRef(state || {})
  const { month, year } = getCurrentMonthYear()

  const {
    values: filters,
    onChange,
    listOfGroups,
  } = useGroupAndMembersFilter({
    group_id:
      isAdmin || isLeader ? null : stateRef.current.group_id || group?.id || "",
    year: stateRef.current.year?.toString() || year,
    month: stateRef.current.month?.toString() || month,
    channel: stateRef.current.channel ?? undefined,
      })

  const {
    appliedFilters,
    handleSearch,
    handleDayPressed,
    isFetching,
    isError,
    isIdle,
    reportData,
    selectedDate,
    table,
    totalSalesString,
    selectedDayData,
    monthSelected,
  } = useSalesMonthlyReport({ filters })

  const totalOrdersString =
    reportData?.total_orders > 0 ? `${reportData.total_orders} Órdenes` : ""

  return (
    <PageLayout title="Ventas mensuales">
      <Card>
        <CardContent>
          <HeaderSection
            filters={filters}
            onChange={onChange}
            handleSearch={handleSearch}
            listOfGroups={listOfGroups}
            monthSelected={monthSelected}
            totalSalesString={totalSalesString}
            totalOrdersString={totalOrdersString}
            isFetching={isFetching}
            channelOptions={channelOptions}
            isIdle={isIdle}
          />
          <NavigateSection
            filters={filters}
            onSearch={handleSearch}
            listOfGroups={listOfGroups}
          />
          <WithStatusState
            isLoading={isFetching}
            isError={isError}
            isIdle={isIdle}
          >
            <CalendarSection
              filters={appliedFilters}
              reportData={reportData}
              handleDayPressed={handleDayPressed}
              selectedDate={selectedDate}
            />

            <SalesTableSection
              selectedDate={selectedDate}
              selectedDayData={selectedDayData}
              table={table}
            />
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentalMensual
