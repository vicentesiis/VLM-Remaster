import React from "react"
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
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"

export const ReportesReporteDeRegistros = () => {
  const { values, onChange, listOfGroups, listOfUsers } =
    useGroupAndMembersFilter({
      group_id: "",
      user_id: "",
      month: "",
      year: "",
    })

  const handleSearch = () => {
    console.log("Search values:", values)
    // Trigger your report fetch logic here
  }

  return (
    <PageLayout title="Reporte de Registros por Agente">
      <Card>
        <CardContent>
          <SectionHeader
            title="Información del Grupo:"
            className="pb-6"
            actions={
              <FilterToolbar
                filterConfig={[
                  ...(listOfGroups.length ? [groupConfig] : []),
                  userConfig,
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
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteDeRegistros
