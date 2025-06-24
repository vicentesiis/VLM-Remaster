import React, { useState } from "react"
import {
  groupConfig,
  yearConfig,
  channelConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent, CardTitle } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useCodexData } from "@/hooks/queries"
import { useGetGroupSalesReport } from "@/hooks/queries/UseReports"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import CalendarPage from "@/components/customs/date-range-picker/calendar"
import { mapToOptions } from "@/utils"
import { useReportTable } from "../hooks/useReportsTable"
import { DataTable } from "@/components/data-table"
import { toast } from "sonner"

export const ReportesReporteVentalMensual = () => {
  const { channels } = useCodexData()
  const channelOptions = mapToOptions(channels.data)
  const { isAdmin, group } = useCurrentUser()

  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isAdmin ? group?.id || "" : "",
        year: "",
    channel: "",
  })

  const [searchParams, setSearchParams] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleSearch = () => {
    const { year, group_id, channel } = values
  
    if (!year || !channel || (!group_id && !isAdmin)) {
      toast.error("Todos los filtros son requeridos")
      return
    }
  
    const month = 5
    const start_date = new Date(year, month, 1).toISOString()
    const end_date = new Date(year, month + 1, 0).toISOString()
  
    const params = {
      start_date,
      end_date,
      channel,
    }
  
    if (!isAdmin) {
      params.group_id = group_id
    }
  
    setSearchParams(params)
    setSelectedDate(null)
  }
  const { data, isLoading, isError } = useGetGroupSalesReport(searchParams ?? {}, {
    enabled: !!searchParams,
  })

  const groupDailySales = data?.group_daily_sales ?? []

  const valores = groupDailySales.reduce((acc, item) => {
    const date = item.date?.split("T")[0]
    if (date) acc[date] = item.total_day_sales / 100
    return acc
  }, {})

  const handleDayClick = (day, month, year) => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0]
    setSelectedDate(dateStr)
  }

  const selectedDayOrders = groupDailySales.find(
    (item) => item.date?.split("T")[0] === selectedDate
  )?.orders ?? []

  const { table } = useReportTable(selectedDayOrders)
console.log("esta es mi data",data,"esta es mi selectedDayorder?: ",selectedDayOrders,"y estos son mis valores", valores)
  return (
    <PageLayout title="Reporte de Ventas por Día">
      <Card>
        <CardContent>
          <SectionHeader
            title="Ventas por Día:"
            className="pb-6"
            actions={
              <FilterToolbar
                filterConfig={[
                  ...(listOfGroups.length ? [groupConfig] : []),
                  yearConfig,
                  channelConfig,
                ]}
                values={values}
                onChange={onChange}
                context={{
                  groups: listOfGroups,
                  channels: channelOptions,
                }}
                onSearch={handleSearch}
              />
            }
          />
          <WithStatusState
            isLoading={isLoading}
            isError={isError}
            hasFetched={!!searchParams}
          >
            <CalendarPage values={valores} onDayClick={handleDayClick} />
            {selectedDate && (
              <div className="mt-8">
                <CardTitle className="mb-4">
                  Órdenes del {selectedDate}
                </CardTitle>
                <DataTable
                  table={table}
                  isLoading={false}
                  isError={false}
                  hasFetched={true}
                  showPagination={false}
                />
              </div>
            )}
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentalMensual