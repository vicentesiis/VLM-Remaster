import React, { useState } from "react"
import { BigCalendar } from "@/components/customs/big-calendar"
import { GenericSelect } from "@/components/customs/generic-select"
import PageLayout from "@/components/customs/page-layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/card"

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

const years = Array.from({ length: 4 }, (_, i) => currentYear - i)
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]
const groups = ["Todos", "Grupo A", "Grupo B", "Grupo C"]

export const MonthlySalesReport = () => {
  const [filters, setFilters] = useState({
    selectedYear: currentYear.toString(),
    selectedMonth: currentMonth.toString(),
    selectedGroup: "",
    displayedYear: null,
    displayedMonth: null,
    displayedGroup: null,
  })

  const [calendarDate, setCalendarDate] = useState(new Date())
  const [error, setError] = useState(false)

  const handleSearch = () => {
    if (!filters.selectedGroup) {
      setError(true)
      return
    }

    const newDate = new Date(
      parseInt(filters.selectedYear),
      parseInt(filters.selectedMonth)
    )
    setCalendarDate(newDate)
    setFilters((prev) => ({
      ...prev,
      displayedYear: filters.selectedYear,
      displayedMonth: filters.selectedMonth,
      displayedGroup: filters.selectedGroup,
    }))
    setError(false)
  }

  return (
    <PageLayout title="Reporte Mensual">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2">
              {/* Display title and subtitle only after search */}
              {filters.displayedYear &&
              filters.displayedMonth &&
              filters.selectedGroup ? (
                <>
                  {months[parseInt(filters.displayedMonth)]}{" - "}
                  {filters.displayedYear}
                  {/* Conditionally render displayedGroup */}
                  {filters.displayedGroup !== "Todos" && (
                    <CardSubTitle>(del {filters.displayedGroup})</CardSubTitle>
                  )}
                </>
              ) : (
                "Reporte Mensual"
              )}
            </CardTitle>

            <div className="flex flex-wrap items-center gap-2">
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
                required={true}
                error={error && !filters.selectedGroup}
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
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            {filters.displayedYear && filters.displayedMonth && (
              <>
                <CardSubTitle>Total de Venta Mensual:</CardSubTitle>
                <CardSubTitle className="text-red-600"> $16,440 </CardSubTitle>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Show the calendar only after the user clicks "Buscar" */}
          {filters.displayedYear &&
            filters.displayedMonth &&
            filters.selectedGroup && <BigCalendar date={calendarDate} />}
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default MonthlySalesReport
