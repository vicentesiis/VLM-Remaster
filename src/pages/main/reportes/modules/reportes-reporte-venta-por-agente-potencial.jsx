import React, { useState } from "react"
import { toast } from "sonner"
import { usePotencialTable } from "../hooks/usePotencialTable"
import {
  userConfig,
  groupConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { DataTable } from "@/components/data-table"
import { Card, CardContent } from "@/components/ui"
import { useGetAgentPotentialSales } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { formatCurrency } from "@/utils"

const ReportesReporteVentaPorAgentePotencial = () => {
  const [searchParams, setSearchParams] = useState(null)
  const { isAdmin, isAgent, isLeader, user, group } = useCurrentUser()

  const { values, onChange, listOfUsers, listOfGroups } =
    useGroupAndMembersFilter({
      group_id: isAdmin ? group?.id || "" : "",
      user_id: "",
    })

  const handleSearch = () => {
    if (!values.user_id) {
      toast.error("Selecciona un agente antes de buscar")
      return
    }
    setSearchParams({ agent_id: values.user_id })
  }

  const isRegularAgent = isAgent && !isLeader
  const queryParams = isRegularAgent
    ? { agent_id: user?.id }
    : (searchParams ?? {})
  const queryEnabled = isRegularAgent ? true : !!searchParams

  const { data, isFetching, isError, isFetched } = useGetAgentPotentialSales(
    queryParams,
    {
      enabled: queryEnabled,
    }
  )

  const { table } = usePotencialTable(data?.records)

  return (
    <PageLayout title="Ventas potenciales">
      <Card>
        <CardContent>
          <SectionHeader
            title={
              isFetched
                ? formatCurrency(data?.total_potential_sales || 0, 'USD')
                : undefined
            }
            subtitle={
              isFetched ? `Registros: ${data?.records?.length ?? 0}` : undefined
            }
            emptyMessage={!isRegularAgent && !isFetched ? "Aplica los filtros para generar el reporte" : ""}
            highlightPositive={isFetched && (data?.total_potential_sales || 0) > 0}
            actions={
              !isRegularAgent ? (
                <FilterToolbar
                  filterConfig={[
                    ...(listOfGroups.length ? [groupConfig] : []),
                    userConfig,
                  ]}
                  values={values}
                  onChange={onChange}
                  context={{
                    ...(listOfGroups.length ? { groups: listOfGroups } : {}),
                    users: listOfUsers,
                  }}
                  onSearch={handleSearch}
                />
              ) : null
            }
          />
          <WithStatusState
            isLoading={isFetching}
            isError={isError}
            isIdle={!isRegularAgent && !isFetched}
          >
            <DataTable table={table} hasFetched showPagination={false} />
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentaPorAgentePotencial
