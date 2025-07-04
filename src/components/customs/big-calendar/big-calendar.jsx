import PropTypes from "prop-types"
import React, { useMemo } from "react"
import BigCalendarHeader from "./big-calendar-header"
import DayCell from "./day-cell"
import { Card, CardContent } from "@/components/ui/card"
import {
  parseMonthYear,
  getCalendarWeeks,
  getDateKey,
  isFutureDate,
} from "@/utils/calendarUtils"

export const BigCalendar = ({ onClick, data = {}, month, year }) => {
  const { zeroBasedMonth, numericYear } = parseMonthYear(month, year)

  const handleDayClick = () => {
    console.log("handleDayClick")
  }

  const dataMap = useMemo(() => {
    if (!Array.isArray(data)) return {}

    return data.reduce((acc, entry) => {
      const dateKey = getDateKey(new Date(entry.date))
      acc[dateKey] = entry
      return acc
    }, {})
  }, [data])

  const calendarWeeks = useMemo(() => {
    const { weeks, today } = getCalendarWeeks(zeroBasedMonth, numericYear)

    return weeks.map((week, weekIndex) => (
      <div className="flex h-20 w-full" key={`week-${weekIndex}`}>
        {week.map(({ day, month }) => {
          const usedMonth = month < 0 ? zeroBasedMonth : month
          const date = new Date(numericYear, usedMonth, day)
          const isDisabled = month < 0 || isFutureDate(date)

          const data = !isDisabled ? dataMap[getDateKey(date)] : null

          return (
            <DayCell
              key={`${month}-${day}-${weekIndex}`}
              date={date}
              data={data}
              onClick={handleDayClick}
            />
          )
        })}
      </div>
    ))
  }, [zeroBasedMonth, numericYear, dataMap])

  return (
    <Card className="rounded-b-none">
      <BigCalendarHeader />
      {calendarWeeks}
    </Card>
  )
}

BigCalendar.propTypes = {
  month: PropTypes.any,
  onClick: PropTypes.any,
  data: PropTypes.any,
  year: PropTypes.any,
}

export default BigCalendar
