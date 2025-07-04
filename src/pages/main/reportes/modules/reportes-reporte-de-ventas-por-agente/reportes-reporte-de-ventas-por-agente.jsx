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
import { DataTable } from "@/components/data-table"
import { Card, CardContent } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { formatCurrency } from "@/utils"

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
    handleSearch,
    handleDayPressed,
    reportData,
    selectedDate,
    selectedDayData,
    table,
    subtitle,
  } = useSalesAgentReport({ filters, userId: id })

  const title = isAgent ? "Ventas" : "Ventas por Agente"

  return (
    <PageLayout title={title}>
      <Card>
        <CardContent>
          <SectionHeader
            title="Mis Ventas"
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

          {filters.month && filters.year && reportData?.agent_daily_sales && (
            <BigCalendar
              month={filters.month}
              year={filters.year}
              data={reportData.agent_daily_sales}
              onClick={handleDayPressed}
              selectedDate={selectedDate}
            />
          )}
          {selectedDate && (
            <div>
              <SectionHeader
                title="Ventas del:"
                extraColor="text-primary/90"
                extra={selectedDate}
                subtitleColor="text-green-600 font-bold"
                subtitle={subtitle}
                className="whitespace-pre-line py-6"
              />
              <DataTable
                table={table}
                hasFetched={!!reportData}
                showPagination={false}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentasPorAgente
