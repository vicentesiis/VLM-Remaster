import React from "react"
import {
  groupConfig,
  yearConfig,
  monthConfig,
  channelConfig,
} from "@/components/customs/filter/filter-config"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import SectionHeader from "@/components/customs/section-header"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { Card, CardContent } from "@/components/ui"
import { DataTable } from "@/components/data-table"
import BigCalendar from "@/components/customs/big-calendar/big-calendar"
import { months } from "@/constants"
import { mapToOptions } from "@/utils"
import { useCodexData } from "@/hooks/queries"
import { useSalesMonthlyReport } from "./reportes-reporte-de-ventas-por-agente/hooks/useVentasMensualReport"
import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

const HeaderSection = ({
  filters,
  onChange,
  handleSearch,
  listOfGroups,
  monthSelected,
  totalSalesString,
  isFetching,
  channelOptions,
}) => (
  <SectionHeader
    title="Ventas por mes"
    extra={monthSelected}
    subtitle={totalSalesString}
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

const SalesTableSection = ({ selectedDate, subtitle, reportData, table }) => {
  if (!selectedDate) return null

  return (
    <div>
      <SectionHeader
        title="Ventas del"
        extra={selectedDate}
        extraColor="text-primary/90"
        subtitle={subtitle}
        subtitleColor="text-green-600 font-bold"
        className="whitespace-pre-line py-6"
      />

      <DataTable
        table={table}
        hasFetched={!!reportData}
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
  const { isAdmin, group } = useCurrentUser()
  const { channels } = useCodexData()
  const channelOptions = mapToOptions(channels.data)
  const { state } = useLocation()
  const stateRef = useRef(state || {})

  const {
    values: filters,
    onChange,
    listOfGroups,
  } = useGroupAndMembersFilter({
    group_id: isAdmin ? "" : stateRef.current.group_id || group?.id || "",
    year: stateRef.current.year?.toString() || "",
    month: stateRef.current.month?.toString() || "",
    channel: stateRef.current.channel || "",
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
    subtitle,
    totalSalesString,
    monthSelected,
  } = useSalesMonthlyReport({ filters })

  return (
    <PageLayout title="Ventas por Mes">
      <Card>
        <CardContent>
          <HeaderSection
            filters={filters}
            onChange={onChange}
            handleSearch={handleSearch}
            listOfGroups={listOfGroups}
            monthSelected={monthSelected}
            totalSalesString={totalSalesString}
            isFetching={isFetching}
            channelOptions={channelOptions}
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
              subtitle={subtitle}
              reportData={reportData}
              table={table}
            />
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentalMensual
