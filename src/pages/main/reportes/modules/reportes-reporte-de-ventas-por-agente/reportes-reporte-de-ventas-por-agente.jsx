import React from "react"
import { useSalesAgentReport } from "./hooks/useSalesAgentReport"
import BigCalendar from "@/components/customs/big-calendar/big-calendar"
import {
  groupConfig,
  monthConfig,
  userConfig,
  yearConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { DataTable } from "@/components/data-table"
import { Card, CardContent } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"

export const ReportesReporteVentasPorAgente = () => {
  const { isAgent, id } = useCurrentUser()

  const {
    values: filters,
    onChange,
    listOfGroups,
    listOfUsers,
  } = useGroupAndMembersFilter({
    group_id: "",
    user_id: "",
    month: "",
    year: "",
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
  } = useSalesAgentReport({ filters, userId: id })

  const title = isAgent ? "Ventas" : "Ventas por Agente"

  return (
    <PageLayout title={title}>
      <Card>
        <CardContent>
          <HeaderSection
            filters={filters}
            onChange={onChange}
            handleSearch={handleSearch}
            listOfGroups={listOfGroups}
            listOfUsers={listOfUsers}
            isAgent={isAgent}
            monthSelected={monthSelected}
            totalSalesString={totalSalesString}
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

const HeaderSection = ({
  filters,
  onChange,
  handleSearch,
  listOfGroups,
  listOfUsers,
  isAgent,
  monthSelected,
  totalSalesString,
}) => (
  <SectionHeader
    title="Mis Ventas"
    extra={monthSelected}
    subtitle={totalSalesString}
    className="pb-6"
    actions={
      <FilterToolbar
        filterConfig={[
          ...(listOfGroups.length ? [groupConfig] : []),
          !isAgent && userConfig,
          monthConfig,
          yearConfig,
        ]}
        values={filters}
        onChange={onChange}
        context={{ groups: listOfGroups, users: listOfUsers }}
        onSearch={handleSearch}
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
  if (!reportData?.agent_daily_sales) return null

  return (
    <BigCalendar
      month={filters.month}
      year={filters.year}
      data={reportData.agent_daily_sales}
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

export default ReportesReporteVentasPorAgente
