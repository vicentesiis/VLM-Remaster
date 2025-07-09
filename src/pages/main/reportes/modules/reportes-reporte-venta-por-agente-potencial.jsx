import React, { useState } from "react"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent } from "@/components/ui"
import { useGetAgentPotentialSales } from "@/hooks/queries/UseReports"
import { usePotencialTable } from "../hooks/usePotencialTable"
import { DataTable } from "@/components/data-table"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { toast } from "sonner"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import { userConfig, groupConfig } from "@/components/customs/filter/filter-config"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const ReportesReporteVentaPorAgentePotencial = () => {
  const [searchParams, setSearchParams] = useState(null)
  const { isAdmin, group } = useCurrentUser()

  const { values, onChange, listOfUsers, listOfGroups } = useGroupAndMembersFilter({
    group_id: isAdmin ? group?.id || "" : "",
    user_id: "",
  })

  const handleSearch = () => {
    if (!values.user_id) {
      toast.error("Selecciona un agente antes de buscar.")
      return
    }
    setSearchParams({ agent_id: values.user_id })
  }

  const { data, isFetching, isError } = useGetAgentPotentialSales
  (searchParams ?? {}, {
    enabled: !!searchParams,
  })

  const records =
    data?.records?.flatMap((record) => {
      if (!record.orders || record.orders.length === 0) return []

      return [
        {
          clientId: record.public_id,
          clientName: record.name,
          agent: record.job,
          orderIds: record.orders.map((o) => o.id),
          expirationDates: record.orders.map((o) => o.expiration_date),
          totalAmount: record.orders.reduce((acc, o) => acc + o.amount, 0),
        },
      ]
    }) ?? []

  const { table } = usePotencialTable(records)

  return (
    <PageLayout title="Reporte Venta Potencial por Agente">
      <Card>
        <CardContent>
          <SectionHeader
            title="Ventas Potenciales por Agente"
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
            isLoading={isFetching}
            isError={isError}
            hasFetched={!searchParams}
          >        
          { data && <DataTable table={table} hasFetched showPagination={false} />}
   </WithStatusState>
 
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentaPorAgentePotencial