import React, { useState } from "react"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent } from "@/components/ui"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import { groupConfig } from "@/components/customs/filter/filter-config"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useGetFinalizedReport } from "@/hooks/queries/UseReports"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { toast } from "sonner"
import { DataTable } from "@/components/data-table"
import { useOrdersTable } from "../../registros/registros-detail/hooks/useOrdersTable"

export const ReporteReporteRecordFinalizado = () => {
  const { isAdmin, group } = useCurrentUser()

  // Si NO es admin, debe elegir grupo (por eso group_id = ""), si es admin usa grupo del usuario directamente
  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isAdmin ? group?.id || "" : "",
  })

  const [searchParams, setSearchParams] = useState(null)

  const handleSearch = () => {
    if (!isAdmin && !values.group_id) {
      toast.error("El grupo es requerido")
      return
    }

    setSearchParams({
      skip: 0,
      limit: 100,
      group_id: isAdmin ? group?.id : values.group_id,
    })
  }

  // Opcional: Lanzar búsqueda automática si admin y grupo ya existe
  React.useEffect(() => {
    if (isAdmin && group?.id && !searchParams) {
      setSearchParams({ skip: 0, limit: 100, group_id: group.id })
    }
  }, [isAdmin, group, searchParams])

  const { data, isLoading, isError } = useGetFinalizedReport(searchParams ?? {}, {
    enabled: !!searchParams,
  })

  const records = (data?.records_and_orders ?? []).map(([record, orderCount]) => ({
    ...record,
    orderCount,
  }))

  const { table } = useOrdersTable(records)

  return (
    <PageLayout title="Reporte de Records Finalizados">
      <Card>
        <CardContent>
          <SectionHeader
            title="Records Finalizados"
            subtitle={
              data?.group_name
                ? `Grupo: ${data.group_name} — Total: ${data.total ?? 0}`
                : ""
            }
            actions={
              !isAdmin ? (
                <FilterToolbar
                  filterConfig={[groupConfig]}
                  values={values}
                  onChange={onChange}
                  context={{ groups: listOfGroups }}
                  onSearch={handleSearch}
                />
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleSearch}
                  style={{ marginLeft: "auto" }}
                >
                  Buscar
                </button>
              )
            }
          />
          <WithStatusState isLoading={isLoading} isError={isError} hasFetched={!!searchParams}>
            <DataTable table={table} showPagination={false} hasFetched />
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReporteReporteRecordFinalizado