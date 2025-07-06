import React from "react"
import CalendarSection from "./calendar-section"
import HeaderSection from "./header-section"
import { useSalesAgentReport } from "./hooks/useSalesAgentReport"
import SalesTableSection from "./sales-table-section"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { Card, CardContent } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { getCurrentMonthYear } from "@/utils"
import { formatMonthNYear } from "@/utils/reportFormatters"

export const ReportesReporteVentasPorAgente = () => {
  const { isAgent, isLeader, id: userId } = useCurrentUser()
  const { month, year } = getCurrentMonthYear()

  const {
    values: filters,
    onChange,
    listOfGroups,
    listOfUsers,
  } = useGroupAndMembersFilter({
    group_id: "",
    user_id: isAgent && !isLeader ? userId : "",
    month: month,
    year: year,
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
    selectedDayData,
    table,
  } = useSalesAgentReport({ filters })

  const title = isAgent ? "Ventas" : "Ventas por Agente"

  const monthNYearSelected = formatMonthNYear(
    appliedFilters?.month,
    appliedFilters?.year
  )

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
            isAgent={isAgent && !isLeader}
            monthSelected={monthNYearSelected}
            reportData={reportData}
            isFetching={isFetching}
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

export default ReportesReporteVentasPorAgente
