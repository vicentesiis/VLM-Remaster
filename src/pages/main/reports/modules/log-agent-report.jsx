import React from "react"
import { useState } from "react"
import CardHeaderSection from "@/components/customs/card-header-section"
import { GenericBarChart } from "@/components/customs/chart/generic-bar-chart"
import GenericSelect from "@/components/customs/generic-select"
import PageLayout from "@/components/customs/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  currentYear,
  years,
  months,
  logChartData,
  currentMonth,
} from "@/constants/utils-contants"

export const LogAgentReport = () => {
  const [filters, setFilters] = useState({
    selectedYear: currentYear.toString(),
    selectedMonth: currentMonth.toString(),
    displayedYear: null,
    displayedMonth: null,
  })

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      displayedYear: filters.selectedYear,
      displayedMonth: filters.selectedMonth,
    }))
  }

  const Actions = () => {
    return (
      <>
        <GenericSelect
          value={filters.selectedYear}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, selectedYear: value }))
          }
          options={years.map((year) => ({
            value: year.toString(),
            label: year,
          }))}
          placeholder="Año"
          className="w-[100px]"
        />

        <GenericSelect
          value={filters.selectedMonth}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, selectedMonth: value }))
          }
          options={months.map((month, index) => ({
            value: index.toString(),
            label: month,
          }))}
          placeholder="Mes"
          className="w-[120px]"
        />

        <Button onClick={handleSearch} className="ml-auto">
          Buscar
        </Button>
      </>
    )
  }

  return (
    <PageLayout title="Reporte de Registros">
      {" "}
      <Card>
        <CardHeaderSection
          title={"Reporte de Registros por Agente"}
          subTitle={
            filters.displayedYear && filters.displayedMonth
              ? `${months[parseInt(filters.displayedMonth)]} - ${filters.displayedYear}`
              : undefined
          }
          actions={<Actions />}
        />
        <CardContent>
          <GenericBarChart data={logChartData} />
        </CardContent>
      </Card>{" "}
    </PageLayout>
  )
}

export default LogAgentReport
