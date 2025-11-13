import PropTypes from "prop-types"
import React, { useMemo } from "react"
import BigCalendarHeader from "./big-calendar-header"
import DayCell from "./day-cell"
import { Card } from "@/components/ui/card"
import {
  parseMonthYear,
  getCalendarWeeks,
  getDateKey,
  isFutureDate,
} from "@/utils/calendarUtils"

export const BigCalendar = ({
  onClick,
  data = {},
  month,
  year,
  selectedDate,
}) => {
  const { zeroBasedMonth, numericYear } = parseMonthYear(month, year)

  const dataMap = useMemo(() => {
    if (!Array.isArray(data)) return {}

    return data.reduce((acc, entry) => {
      const dateKey = getDateKey(new Date(entry.date))
      acc[dateKey] = entry
      return acc
    }, {})
  }, [data])

  const hasData = useMemo(() => {
    if (!Array.isArray(data)) return false
    if (data.length === 0) return false
    
    return data.some(entry => 
      (entry.total_day_sales > 0) || (entry.total_day_orders > 0)
    )
  }, [data])

  const calendarWeeks = useMemo(() => {
    const { weeks } = getCalendarWeeks(zeroBasedMonth, numericYear)

    return weeks.map((week, weekIndex) => (
      <div className="grid grid-cols-7 divide-x divide-border" key={`week-${weekIndex}`}>
        {week.map(({ day, month }) => {
          const usedMonth = month < 0 ? zeroBasedMonth : month
          const date = new Date(numericYear, usedMonth, day)

          const isOutsideMonth = month < 0
          const isDisabled = isOutsideMonth || isFutureDate(date)

          const data = !isDisabled ? dataMap[getDateKey(date)] : null

          return (
            <DayCell
              key={`${month}-${day}-${weekIndex}`}
              date={date}
              data={data}
              onClick={onClick}
              isOutsideMonth={isOutsideMonth}
              isSelected={getDateKey(date) === selectedDate}
            />
          )
        })}
      </div>
    ))
  }, [zeroBasedMonth, numericYear, dataMap, selectedDate])

  return (
    <Card className="overflow-hidden rounded-lg border shadow-sm relative">
      <BigCalendarHeader />
      <div className={`divide-y divide-border ${!hasData ? 'blur-sm pointer-events-none' : ''}`}>
        {calendarWeeks}
      </div>
      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/30">
          <div className="bg-background border rounded-lg px-6 py-4 shadow-lg">
            <p className="text-muted-foreground font-medium">No hay ventas en el mes seleccionado</p>
          </div>
        </div>
      )}
    </Card>
  )
}

BigCalendar.propTypes = {
  month: PropTypes.any,
  onClick: PropTypes.any,
  data: PropTypes.any,
  year: PropTypes.any,
  selectedDate: PropTypes.any,
}

export default BigCalendar
