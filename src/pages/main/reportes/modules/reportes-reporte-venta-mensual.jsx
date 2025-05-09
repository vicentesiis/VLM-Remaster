import React, { useState } from "react"
import { BigCalendar } from "@/components/customs/big-calendar"
import { CardHeaderSection } from "@/components/customs/card-header-section"
import { GenericSelect } from "@/components/customs/generic-select"
import PageLayout from "@/components/customs/layout/page-layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/card"
import {
  months,
  years,
  currentYear,
  currentMonth,
  groups,
} from "@/constants/utils-contants"

export const ReportesReporteVentalMensual = () => {
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

  const Actions = () => {
    return (
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

        <Button onClick={handleSearch}>Buscar</Button>
      </div>
    )
  }

  return (
    <PageLayout title="Reporte Mensual">
      <Card>
        <CardHeaderSection
          title={"Reporte Mensual"}
          titleHelper={
            filters.displayedYear &&
            filters.displayedGroup &&
            filters.displayedGroup !== "Todos"
              ? `(del ${filters.displayedGroup})`
              : undefined
          }
          subTitle={
            filters.displayedYear && filters.displayedMonth
              ? `${months[parseInt(filters.displayedMonth)]} - ${filters.displayedYear}`
              : undefined
          }
          actions={<Actions />}
        />
        <CardContent>
          <div className="mt-2 flex items-center gap-2">
            {filters.displayedYear && filters.displayedMonth && (
              <>
                <CardSubTitle>Total de Venta Mensual:</CardSubTitle>
                <CardSubTitle className="text-red-600"> $16,440 </CardSubTitle>
              </>
            )}
          </div>
          {/* Show the calendar only after the user clicks "Buscar" */}
          {filters.displayedYear &&
            filters.displayedMonth &&
            filters.selectedGroup && <BigCalendar date={calendarDate} />}
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReportesReporteVentalMensual
