import React, { useState } from "react"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent, Button } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGetFinalizedReport } from "@/hooks/queries/UseReports"
import { useFinalizedReportTable } from "../hooks/useFinalizedTable"
import { DataTable } from "@/components/data-table"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { toast } from "sonner"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import { groupConfig } from "@/components/customs/filter/filter-config"

const ReporteReporteRecordFinalizado = () => {
  const { isAdmin, group } = useCurrentUser()
  const [searchTriggered, setSearchTriggered] = useState(false)

  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isAdmin ? group?.id || "" : "",
  })

  const canSearch = !isAdmin || !!group?.id
  const groupIdToSearch = isAdmin ? group?.id : values.group_id

  const { data, isLoading, isError } = useGetFinalizedReport(
    {
      skip: 0,
      limit: 100,
      ...(groupIdToSearch ? { group_id: groupIdToSearch } : {}),
    },
    { enabled: searchTriggered && canSearch }
  )

  const handleSearch = () => {
    if (!canSearch) {
      toast.error("No puedes hacer la búsqueda sin grupo asignado.")
      return
    }
    if (!isAdmin && !values.group_id) {
      toast.error("Selecciona un grupo antes de buscar.")
      return
    }
    setSearchTriggered(true)
  }

  const records = data?.records_and_orders?.map(([record, orderCount]) => ({
    ...record,
    orderCount,
  })) ?? []

  const { table } = useFinalizedReportTable(searchTriggered ? records : [])

  return (
    <PageLayout title="Reporte de Registros Finalizados">
      <Card>
        <CardContent>
          <SectionHeader
            title="Registros Finalizados"
            className="pb-6"
            actions={
              <>
                {!isAdmin && (
                  <FilterToolbar
                    filterConfig={[groupConfig]}
                    values={values}
                    onChange={onChange}
                    context={{ groups: listOfGroups }}
                  />
                )}
                <Button onClick={handleSearch}>Buscar</Button>
              </>
            }
          />
          <WithStatusState
            isLoading={isLoading}
            isError={isError}
            hasFetched={searchTriggered}
          >
            {records.length > 0 && <DataTable table={table} hasFetched />}
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReporteReporteRecordFinalizado