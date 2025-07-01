import React, { useState } from "react"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { userConfig, groupConfig } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent } from "@/components/ui"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGetAgentCutOff } from "@/hooks/queries/UseReports"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { toast } from "sonner"
import { DataTable } from "@/components/data-table"
import { useOrdersTable } from "../../registros/registros-detail/hooks/useOrdersTable"

export const ReporteReporteCorteAgente = () => {
  const [searchParams, setSearchParams] = useState(null)
  const { isAdmin, group } = useCurrentUser()

  const { values, onChange, listOfUsers, listOfGroups } =
    useGroupAndMembersFilter({
      group_id: isAdmin ? group?.id || "" : "",
      user_id: "",
    })

  const handleSearch = () => {
    if (!values.user_id) {
      toast.error("El agente es requerido")
      return
    }

    setSearchParams({ agent_id: values.user_id })
  }

  const { data, isLoading, isError } = useGetAgentCutOff(searchParams ?? {}, {
    enabled: !!searchParams,
  })

  const orders = data?.data?.orders ?? []
  const { table } = useOrdersTable(orders)

  return (
    <PageLayout title="Reporte de Corte por Agente">
      <Card>
        <CardContent>
          <SectionHeader
            title="Información del Agente"
            actions={
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
            }
          />
          <WithStatusState
            isLoading={isLoading}
            isError={isError}
            hasFetched={!!searchParams}
          >
            <DataTable table={table} showPagination={false} hasFetched />
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReporteReporteCorteAgente