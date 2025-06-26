import React, { useState } from "react"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { userConfig } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent } from "@/components/ui"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGetAgentCutOff } from "@/hooks/queries/UseReports"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { toast } from "sonner"

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
  return (
    <PageLayout title="Reporte de Corte por Agente">
      <Card>
        <CardContent>
          <SectionHeader
            title="Información del Agente"
            actions={
              <FilterToolbar
                filterConfig={[userConfig]}
                values={values}
                onChange={onChange}
                context={{ users: listOfUsers }}
                onSearch={handleSearch}
              />
            }
          />
          <WithStatusState
            isLoading={isLoading}
            isError={isError}
            hasFetched={!!searchParams}
          ></WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReporteReporteCorteAgente
