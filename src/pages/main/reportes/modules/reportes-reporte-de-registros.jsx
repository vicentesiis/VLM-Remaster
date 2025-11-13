import { useQueryClient } from "@tanstack/react-query"
import { endOfMonth, format } from "date-fns"
import React, { useState } from "react"
import ChartRegistros from "@/components/customs/bar-charts/chart-registros"
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
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { Card, CardContent } from "@/components/ui"
import { useGetAgentRegistrations } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { formatDate, getCurrentMonthYear } from "@/utils"
import { formatIfExists } from "@/utils/reportFormatters"
import { es } from "date-fns/locale"

export const ReportesReporteDeRegistros = () => {
  const [searchParams, setSearchParams] = useState(null)
  const { isAdmin, group } = useCurrentUser()

  const { month, year } = getCurrentMonthYear()
  const queryClient = useQueryClient()

  const { values, onChange, listOfGroups, listOfUsers } =
    useGroupAndMembersFilter({
      group_id: isAdmin ? group?.id || "" : "",
      user_id: "",
      month: month,
      year: year,
      record_type: "",
    })

  const handleSearch = () => {
    const { user_id, month, year, record_type } = values
    console.log(values)
    const start_date = `${year}-${month}-01T00:00:00`
    const end_date = format(
      endOfMonth(new Date(start_date)),
      "yyyy-MM-dd'T'23:59:59"
    )

    queryClient.invalidateQueries({
      queryKey: ["agentRegistrationsReport"],
    })

    setSearchParams({ user_id, start_date, end_date, record_type })
  }

  const { data, isFetching, isFetched, isError } = useGetAgentRegistrations(
    searchParams ?? {},
    {
      enabled: !!searchParams,
    }
  )

  const dailyRegistrations = data?.daily_registrations

  const chartData = Array.isArray(dailyRegistrations)
    ? dailyRegistrations.map((registro) => ({
        title: format(new Date(registro.date), "MMM d", { locale: es }),
        registrations: registro.amount_of_registrations ?? 0,
        contacted: registro.amount_of_effective_contact ?? 0,
        formatted: String(registro.amount_of_registrations ?? 0),
      }))
    : []

  const sumField = (items, field) =>
    Array.isArray(items)
      ? items.reduce((sum, item) => sum + (Number(item?.[field]) || 0), 0)
      : null

  const totalRegistration = sumField(
    dailyRegistrations,
    "amount_of_registrations"
  )
  const totalContacted = sumField(
    dailyRegistrations,
    "amount_of_effective_contact"
  )

  const formatSummary = (value, label) =>
    formatIfExists(value, (n) => `${label}: ${n}`)

  const contactedPercentage =
    totalRegistration > 0
      ? ((totalContacted / totalRegistration) * 100).toFixed(1)
      : null

  const totalRegistrationInfo = formatSummary(totalRegistration, "Registros")
  const totalContactedInfo = formatSummary(totalContacted, "Contacto efectivo")

  const totalContactedInfoWithPercentage =
    isFetched && contactedPercentage !== null
      ? `${totalContactedInfo} (${contactedPercentage}%)`
      : totalContactedInfo

  return (
    <PageLayout title="Registros por Agente">
      <Card>
        <CardContent>
          <SectionHeader
            title={data?.username ?? ""}
            subtitle={totalContactedInfoWithPercentage}
            extra={totalRegistrationInfo}
            emptyMessage={!isFetched ? "Aplica filtros para generar el reporte" : ""}
            highlightPositive={isFetched && totalRegistration > 0}
            actions={
              <FilterToolbar
                filterConfig={[
                  ...(listOfGroups.length ? [groupConfig] : []),
                  userConfig,
                  record_type,
                  yearConfig,
                  monthConfig,
                ]}
                values={values}
                onChange={onChange}
                context={{ groups: listOfGroups, users: listOfUsers }}
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
            {data && <ChartRegistros data={chartData} />}
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteDeRegistros
