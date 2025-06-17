import React, { useState } from "react"
import { BarChartNotStacked } from "@/components/customs/bar-chart-notStacked"
import PageLayout from "@/components/customs/layout/page-layout"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { extractAndMapToOptions } from "@/utils"
import { useUserRole } from "@/hooks"
import { useCodexData } from "@/hooks/queries"
import { useFiltersState } from "@/hooks/useFiltersState"
import {
  registrosFilterConfig,
  currentYear,
  mont,
} from "@/components/customs/filter/filter-config"
import { useGetVentasGlobales } from "@/hooks/queries/UseReports"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export const ReportesReporteVentasGlobales = () => {
  const navigate = useNavigate()
  const currentRole = useUserRole()
  const { groups, channels } = useCodexData(currentRole)
  const listOfGroups = extractAndMapToOptions(groups)
  const listOfChannels = extractAndMapToOptions(channels)

  const { values, onChange } = useFiltersState({
    group_id: "",
    channel: "",
    year: currentYear.toString(),
  })

  const [dataFinal, setDataFinal] = useState(null)

  const { refetch } = useGetVentasGlobales(
    {
      year: values.year,
      group: values.group_id,
      channel: values.channel,
    },
    {
      enabled: false,
    }
  )

  const handleSearch = async () => {
    if (!values.group_id) {
      toast.error("El Grupo es necesario para el proceso")
      return
    }

    const { data } = await refetch()
    if (data) {
      setDataFinal(data)
      console.log("Datos recibidos:", data)
    }
  }

  const timelineData = mont.map((month) => ({
    title: month.label,
    description: dataFinal?.[month.value.toLowerCase()] || 0,
  }))

  return (
    <PageLayout title="Reporte de Ventas Globales">
      <Card>
        <CardHeader>
          <CardTitle>Reporte de ventas globales</CardTitle>
          <FilterToolbar
            filterConfig={registrosFilterConfig}
            values={values}
            onChange={onChange}
            context={{
              groups: listOfGroups,
              channels: listOfChannels,
            }}
            onSearch={handleSearch}
          />
        </CardHeader>
        <CardContent>
          {dataFinal && (
            <BarChartNotStacked
              data={timelineData}
              onValueChange={(item) => {
                console.log("Barra clickeada:", item)
                navigate("/reportes/ventas-mensuales", {
                  state: { year: item.date, group: item.Sales },
                })
              }}
              
            />
          )}
        </CardContent>
      </Card>
    </PageLayout>
  )
}
