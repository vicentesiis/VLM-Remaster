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

export const SalesReport = () => {
  const chartData = [
    {
      day: "1 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "2 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "3 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "4 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "5 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "6 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "7 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "8 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "9 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "10 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "11 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "12 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "13 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "14 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "15 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "16 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "17 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "18 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "19 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "20 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
    {
      day: "21 de Marzo",
      agenteV: Math.floor(Math.random() * 13),
      adminV: Math.floor(Math.random() * 13),
    },
  ]

  function SalesReportFilter() {
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

  function SalesReportChart() {
    return (
      <GenericBarChart
        data={chartData}
        title="Reporte de Ventas"
        description="Febrero - Marzo 2024"
        footerText="Showing total visitors for the last 6 months"
      />
    )
    // return <BaseTable data={tasksTableData} tableType={"tasks"} />
  }

  return (
    <PageLayout title="Reporte de Ventas">
      <Card>
        <CardContent >
          <FilterTableLayout
            FilterComponent={SalesReportFilter}
            TableComponent={SalesReportChart}
            // Hide the title when is a chart
            tableTitle={"Lista de Tareas"}
            helperTitle={"23 de 23 Tareas"}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default SalesReport
