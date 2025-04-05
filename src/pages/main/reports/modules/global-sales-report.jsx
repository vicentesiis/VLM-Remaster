import React, { useState } from "react"
import { GenericSelect } from "@/components/customs/generic-select"
import { GenericTimeline } from "@/components/customs/generic-timeline"
import PageLayout from "@/components/customs/page-layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/card"

export const GlobalSalesReport = () => {
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

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i)
  const groups = ["Todos", "Grupo A", "Grupo B", "Grupo C"]

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

  return (
    <PageLayout title="Reporte de Ventas Globales">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex flex-row items-center gap-2">
              {/* Display the title and subtitle only after search */}
              {filters.displayedYear && filters.displayedGroup ? (
                <>
                  Reporte de Ventas del {filters.displayedYear}
                  {filters.displayedGroup !== "Todos" && (
                    <CardSubTitle>del {filters.displayedGroup}</CardSubTitle>
                  )}
                </>
              ) : (
                "Reporte de Ventas"
              )}
            </CardTitle>

            <div className="flex gap-4">
              {/* Group Select */}
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

              {/* Year Select */}
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

              {/* Search Button */}
              <Button onClick={handleSearch}>Buscar</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filters.displayedYear && filters.displayedGroup ? (
            <div className="ml-8 py-32">
              <GenericTimeline data={data} />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default GlobalSalesReport
