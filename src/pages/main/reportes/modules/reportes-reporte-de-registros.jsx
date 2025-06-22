import React, { useState } from "react"
import {
  groupConfig,
  monthConfig,
  record_type,
  userConfig,
  yearConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent, CardTitle } from "@/components/ui"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { endOfMonth, format } from "date-fns"
import { useGetAgentRegistrations } from "@/hooks/queries/UseReports"
import ChartRegistros from "@/components/customs/bar-charts/chart-registros"
import { es } from "date-fns/locale"
import { toast } from "sonner"
import { Users, User, Calendar, FileText } from "lucide-react"
export const ReportesReporteDeRegistros = () => {
  const [searchParams, setSearchParams] = useState(null)
  const { isAdmin, group } = useCurrentUser()
  const { values, onChange, listOfGroups, listOfUsers } =
    useGroupAndMembersFilter({
      group_id: isAdmin ? group?.id || "" : "",
      user_id: "",
      month: "",
      year: "",
      record_type: "",
    })

  const handleSearch = () => {
    const { user_id, month, year, record_type } = values
    if (!user_id || !month || !year) {
      toast.error("Por favor llene los campos obligatorios.")
      return
    }

    const start_date = `${year}-${month}-01T00:00:00`
    const end_date = format(
      endOfMonth(new Date(start_date)),
      "yyyy-MM-dd'T'23:59:59"
    )

    setSearchParams({ user_id, start_date, end_date, record_type })
  }

  const { data } = useGetAgentRegistrations(searchParams ?? {}, {
    enabled: !!searchParams,
  })

  const chartData = Array.isArray(data?.daily_registrations)
    ? data.daily_registrations.map((registro) => ({
        title: format(new Date(registro.date), "MMM d", { locale: es }),
        description: registro.amount_of_registrations ?? 0,
      }))
    : []
  
  return (
    <PageLayout title="Reporte de Registros por Agente">
      <Card>
        <CardContent>
          <SectionHeader
            title="Información del Grupo:"
            className=""
            actions={
              <FilterToolbar
                filterConfig={[
                  ...(listOfGroups.length ? [groupConfig] : []),
                  userConfig,
                  monthConfig,
                  yearConfig,
                  record_type,  
                ]}
                values={values}
                onChange={onChange}
                context={{ groups: listOfGroups, users: listOfUsers }}
                onSearch={handleSearch}
              />
            }
          />
        </CardContent>
        <CardContent>{data && <ChartRegistros data={chartData} />}</CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteDeRegistros
