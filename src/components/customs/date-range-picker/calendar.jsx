import React from "react"
import { ContinuousCalendar } from "./continuos-calendar"

const CalendarPage = ({ values = {}, onDayClick, month, year }) => {
  const handleDayClick = (day, month, year) => {
    if (onDayClick) onDayClick(day, month, year)
  }

  return (
    <ContinuousCalendar
      onClick={handleDayClick}
      values={values}
      month={month}
      year={year}
    />
  )
}

export default CalendarPage