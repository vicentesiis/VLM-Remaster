import React, { useState } from "react"
import CardHeaderSection from "@/components/customs/card-header-section"
import { GenericSelect } from "@/components/customs/generic-select"
import { GenericTimeline } from "@/components/customs/generic-timeline"
import PageLayout from "@/components/customs/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { years, currentYear, groups } from "@/constants/utils-contants"

export const ReportesReporteVentasGlobales = () => {
  const [data, setData] = useState([
    { title: "Enero", description: "$3,200" },
    { title: "Febrero", description: "$3,000" },
    { title: "Marzo", description: "$4,500" },
    { title: "Abril", description: "$5,100" },
    { title: "Mayo", description: "$4,800" },
    { title: "Junio", description: "$3,900" },
    { title: "Julio", description: "$4,200" },
    { title: "Agosto", description: "$4,300" },
    { title: "Septiembre", description: "$3,700" },
    { title: "Octubre", description: "$4,950" },
    { title: "Noviembre", description: "$5,400" },
    { title: "Diciembre", description: "$6,100" },
  ])

  const [filters, setFilters] = useState({
    selectedGroup: "Todos",
    selectedYear: currentYear.toString(),
    displayedYear: null,
    displayedGroup: null,
  })

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      displayedYear: prev.selectedYear,
      displayedGroup: prev.selectedGroup,
    }))

    // Simulating data update on search
    const updatedData = [
      { title: "Enero", description: `$${Math.floor(Math.random() * 10000)}` },
      {
        title: "Febrero",
        description: `$${Math.floor(Math.random() * 10000)}`,
      },
      { title: "Marzo", description: `$${Math.floor(Math.random() * 10000)}` },
      { title: "Abril", description: `$${Math.floor(Math.random() * 10000)}` },
      { title: "Mayo", description: `$${Math.floor(Math.random() * 10000)}` },
      { title: "Junio", description: `$${Math.floor(Math.random() * 10000)}` },
      { title: "Julio", description: `$${Math.floor(Math.random() * 10000)}` },
      { title: "Agosto", description: `$${Math.floor(Math.random() * 10000)}` },
      {
        title: "Septiembre",
        description: `$${Math.floor(Math.random() * 10000)}`,
      },
      {
        title: "Octubre",
        description: `$${Math.floor(Math.random() * 10000)}`,
      },
      {
        title: "Noviembre",
        description: `$${Math.floor(Math.random() * 10000)}`,
      },
      {
        title: "Diciembre",
        description: `$${Math.floor(Math.random() * 10000)}`,
      },
    ]
    setData(updatedData)
  }

  const Actions = () => {
    return (
      <>
        <GenericSelect
          value={filters.selectedGroup}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, selectedGroup: value }))
          }
          options={groups.map((group) => ({
            value: group,
            label: group,
          }))}
          placeholder="Filtrar por Grupo"
          className="w-[150px]"
        />
        <GenericSelect
          value={filters.selectedYear}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, selectedYear: value }))
          }
          options={years.map((year) => ({
            value: year.toString(),
            label: year,
          }))}
          placeholder="Filtrar por Año"
          className="w-[100px]"
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </>
    )
  }

  return (
    <PageLayout title="Reporte de Ventas Globales">
      <Card>
        <CardHeaderSection
          title={"Reporte de Ventas Globales"}
          titleHelper={
            filters.displayedYear &&
            filters.displayedGroup &&
            filters.displayedGroup !== "Todos"
              ? `(del ${filters.displayedGroup})`
              : undefined
          }
          subTitle={filters.displayedYear}
          actions={<Actions />}
        />
        <CardContent>
          {filters.displayedYear && filters.displayedGroup ? (
            <div className="py-8 sm:ml-8 sm:py-32">
              <GenericTimeline data={data} />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentasGlobales
