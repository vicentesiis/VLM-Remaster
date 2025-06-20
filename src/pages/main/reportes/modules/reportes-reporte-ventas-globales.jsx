import React from "react"
import {
  groupConfig,
  monthConfig,
  yearConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"

export const ReportesReporteVentasGlobales = () => {
  const { isAdmin, group } = useCurrentUser()
  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isAdmin ? group?.id || "" : "",
    month: "",
    year: "",
  })

  const handleSearch = () => {
    console.log("Search values:", values)
    // Trigger your report fetch logic here
  }

  return (
    <PageLayout title="ReportesReporteVentasGlobales">
      <Card>
        <CardContent>
          <SectionHeader
            title="Ventas Globales:"
            className="pb-6"
            actions={
              <FilterToolbar
                filterConfig={[
                  ...(listOfGroups.length ? [groupConfig] : []),
                  monthConfig,
                  yearConfig,
                ]}
                values={values}
                onChange={onChange}
                context={{
                  groups: listOfGroups,
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

export default ReportesReporteVentasGlobales
