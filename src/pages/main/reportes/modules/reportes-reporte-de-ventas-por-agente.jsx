import React, { useEffect, useState } from "react"
import BigCalendar from "@/components/customs/big-calendar/big-calendar"
import {
  groupConfig,
  monthConfig,
  userConfig,
  yearConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent } from "@/components/ui"
import { useGetReportsSalesAgent } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"

export const ReportesReporteVentasPorAgente = () => {
  const { isAgent, id } = useCurrentUser()

  const today = new Date()
  const end_date = today.toISOString()
  const start_date = new Date("2025-06-01T00:00:00Z").toISOString()

  const [reportData, setReportData] = useState(null)

  const params = {
    user_id: id,
    start_date,
    end_date,
  }

  const { refetch } = useGetReportsSalesAgent(params, {
    enabled: false,
  })

  const title = isAgent ? "Ventas" : "Ventas por Agente"

  const {
    values, // contains: { group_id, user_id, month, year }
    onChange,
    listOfGroups,
    listOfUsers,
  } = useGroupAndMembersFilter({
    group_id: "",
    user_id: "",
    month: "",
    year: "",
  })

  const handleSearch = async () => {
    const res = await refetch()
    setReportData(res.data?.data || null)
  }

  return (
    <PageLayout title={title}>
      <Card>
        <CardContent>
          <SectionHeader
            title="Mis Ventas"
            className="pb-6"
            actions={
              <FilterToolbar
                filterConfig={[
                  ...(listOfGroups.length ? [groupConfig] : []),
                  !isAgent && userConfig,
                  monthConfig,
                  yearConfig,
                ]}
                values={values}
                onChange={onChange}
                context={{
                  groups: listOfGroups,
                  users: listOfUsers,
                }}
                onSearch={handleSearch}
              />
            }
          />

          {values.month && values.year && reportData?.agent_daily_sales && (
            <BigCalendar
              month={values.month}
              year={values.year}
              data={reportData.agent_daily_sales}
            />
          )}
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentasPorAgente
