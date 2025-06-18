import React from "react"
import { toast } from "sonner"
import { baseFilterConfig } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { Card, CardHeader, CardTitle } from "@/components/ui"
import { useCodexData } from "@/hooks/queries"
import { useFiltersState } from "@/hooks/useFiltersState"
import { useUserPermissions } from "@/hooks/useUserPermissions"
import { extractAndMapToOptions } from "@/utils"

export const ReportesReporteVentalMensual = () => {
  const { role } = useUserPermissions()
  const { groups } = useCodexData(role)
  const listOfGroups = extractAndMapToOptions(groups)

  const { values, onChange } = useFiltersState({
    group: "",
    month: "04", // Settear mes acual
    year: "2025", // Settear año acual
  })

  const handleSearch = () => {
    if (!values.group) {
      toast.error("El Grupo es necesario para el proceso")
    }
  }

  return (
    <PageLayout title="Reporte Mensual">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Futuro Texto</CardTitle>

            <FilterToolbar
              filterConfig={baseFilterConfig}
              values={values}
              onChange={onChange}
              context={{ groups: listOfGroups }}
              onSearch={handleSearch}
            />
          </div>
        </CardHeader>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentalMensual
