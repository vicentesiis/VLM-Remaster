import { SearchIcon } from "lucide-react"
import React from "react"
import { GenericBarChart } from "@/components/customs/chart/generic-bar-chart"
import { CollapsibleFilter } from "@/components/customs/collapsible-filter"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import { FilterTableLayout } from "@/components/customs/filter-table-layout"
import InputIcon from "@/components/customs/input-icon"
import PageLayout from "@/components/customs/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { H3Border } from "@/components/ui/typography"

export const LogAgentReport = () => {
  const chartData = [
    {
      day: 1,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 2,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 3,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 4,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 5,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 6,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 7,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 8,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 9,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 10,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 11,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 12,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 13,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 14,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 15,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 16,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 17,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 18,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 19,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 20,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 21,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 22,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 23,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 24,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 25,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 26,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 27,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 28,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 29,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
    {
      day: 30,
      agenteA: Math.floor(Math.random() * 6),
      agenteB: Math.floor(Math.random() * 6),
      agenteC: Math.floor(Math.random() * 6),
      agenteD: Math.floor(Math.random() * 6),
      agenteE: Math.floor(Math.random() * 6),
      agenteF: Math.floor(Math.random() * 6),
      agenteG: Math.floor(Math.random() * 6),
    },
  ]

  function LogAgentReportFilter() {
    return (
      <div className="mr-4 flex flex-col">
        <H3Border>Filtros</H3Border>
        <CollapsibleFilter
          className="flex flex-col gap-4"
          title="Rango de Fechas"
        >
          <DateRangePicker locale="es-MX" showCompare={false} />
        </CollapsibleFilter>
        <div className="flex justify-end sm:mt-8">
          <Button>Aplicar</Button>
        </div>
      </div>
    )
  }

  function LogAgentReportChart() {
    return <GenericBarChart data={chartData} />
  }

  return (
    <PageLayout title="Reporte de Ventas">
      <Card>
        <CardContent>
          <FilterTableLayout
            FilterComponent={LogAgentReportFilter}
            TableComponent={LogAgentReportChart}
            tableTitle="Reporte de Registros de Agente"
            helperTitle="Febrero - Marzo 2024"
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default LogAgentReport
