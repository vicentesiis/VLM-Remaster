import React, { useState } from "react"
import { BigCalendar } from "@/components/customs/big-calendar"
import PageLayout from "@/components/customs/page-layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

export const MonthlySalesReport = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear.toString())
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString())
  const [calendarDate, setCalendarDate] = useState(new Date())

  // Title values that update only on "Buscar"
  const [displayedYear, setDisplayedYear] = useState(currentYear.toString())
  const [displayedMonth, setDisplayedMonth] = useState(currentMonth.toString())

  const handleSearch = () => {
    const newDate = new Date(parseInt(selectedYear), parseInt(selectedMonth), 1)
    setCalendarDate(newDate)
    setDisplayedYear(selectedYear)
    setDisplayedMonth(selectedMonth)
  }

  return (
    <PageLayout title="Reporte Mensual">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2">
              {months[parseInt(displayedMonth)]} {displayedYear}
            </CardTitle>

            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={selectedYear}
                onValueChange={(value) => setSelectedYear(value)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedMonth}
                onValueChange={(value) => setSelectedMonth(value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Mes" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={month} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={handleSearch} className="ml-auto">
                Buscar
              </Button>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <CardSubTitle>Total de Venta Mensual:</CardSubTitle>
            <CardSubTitle className="text-red-600"> $16,440 </CardSubTitle>
          </div>
        </CardHeader>

        <CardContent>
          <BigCalendar date={calendarDate} />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default MonthlySalesReport
