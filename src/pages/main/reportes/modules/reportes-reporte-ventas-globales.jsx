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
import { mapVentasGlobalesToChartData, mapToOptions } from "@/utils"
import { useGetVentasGlobales } from "@/hooks/queries/UseReports"
import ChartRegistros from "@/components/customs/bar-charts/chart-registros"
import { toast } from "sonner"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"

export const ReportesReporteVentasGlobales = () => {
  const { channels } = useCodexData()
  const channelOptions = mapToOptions(channels.data)
  const { isAdmin, group } = useCurrentUser()
  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isAdmin ? group?.id || "" : "",
    year: "",
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

  const { data, isLoading, isError } = useGetVentasGlobales(
    searchParams ?? {},
    {
      enabled: !!searchParams,
    }
  )
  const chartData = data ? mapVentasGlobalesToChartData(data) : []
  return (
    <PageLayout title="ReportesReporteVentasGlobales">
      <Card>
        <CardContent>
          <SectionHeader
            title="Ventas Globales:"
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
            {data && (<ChartRegistros data={chartData} formatAsCurrency={true} />)}
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentasGlobales
