import React, { useState } from "react"
import {
  groupConfig,
  yearConfig,
  channelConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useCodexData } from "@/hooks/queries"
import {
  mapVentasGlobalesToChartData,
  mapToOptions,
  getCurrentMonthYear,
  formatCurrency,
} from "@/utils"
import { useGetVentasGlobales } from "@/hooks/queries/UseReports"
import ChartRegistros from "@/components/customs/bar-charts/chart-registros"
import { toast } from "sonner"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { useNavigate } from "react-router-dom"
import { months } from "@/constants"

export const ReportesReporteVentasGlobales = () => {
  const navigate = useNavigate()
  const { channels } = useCodexData()
  const channelOptions = mapToOptions(channels.data)
  const { isAdmin, group } = useCurrentUser()

  const { year } = getCurrentMonthYear()

  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isAdmin ? group?.id || "" : "",
    year: year,
    channel: "",
  })
  const [searchParams, setSearchParams] = useState(null)

  const handleSearch = () => {
    const { year, channel, group_id } = values

    const error = !group_id
      ? "El grupo es necesario"
      : !year
        ? "El year es necesario"
        : !channel
          ? "El channel es necesario"
          : ""
    if (error) {
      toast.error(error)
      return
    }
    setSearchParams({ year, channel, group: group_id })
  }

  const { data, isFetched, isFetching, isError } = useGetVentasGlobales(
    searchParams ?? {},
    {
      enabled: !!searchParams,
    }
  )
  const chartData = data ? mapVentasGlobalesToChartData(data) : []
  return (
    <PageLayout title="Ventas Globales">
      <Card>
        <CardContent>
          <SectionHeader
            title={data ? formatCurrency(data?.total_sales) : ""}
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
                isLoading={isFetching}
                onSearch={handleSearch}
              />
            }
          />
          <WithStatusState
            isLoading={isFetching}
            isError={isError}
            isIdle={!isFetched}
          >
            {data && (
              <ChartRegistros
                data={chartData}
                formatAsCurrency={true}
                onValueChange={(item) => {
                  const monthObj = months.find(
                    (m) => m.label.toLowerCase() === item.date.toLowerCase()
                  )
                  const month = Number(monthObj.value)
                  const year = Number(values.year)
                  const channel = values.channel
                  const group_id = values.group_id

                  navigate(`/reportes/ventas-mensuales?ts=${Date.now()}`, {
                    state: { month, year, channel, group_id },
                  })
                }}
              />
            )}
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentasGlobales
