"use client"

import React, { useMemo, useRef } from "react"

const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

export const ContinuousCalendar = ({ onClick, values = {}, month, year }) => {
  const parsedMonth = parseInt(month, 10) - 1
  const parsedYear = parseInt(year, 10)
  const dayRefs = useRef([])

  const handleDayClick = (day, month, year) => {
    if (onClick) onClick(day, month, year)
  }

  const generateCalendar = useMemo(() => {
    const today = new Date()
    const daysInMonth = new Date(parsedYear, parsedMonth + 1, 0).getDate()
    const startDay = new Date(parsedYear, parsedMonth, 1).getDay()
    const daysArray = []

    const prevMonth = parsedMonth === 0 ? 11 : parsedMonth - 1
    const prevYear = parsedMonth === 0 ? parsedYear - 1 : parsedYear
    const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate()

    for (let i = startDay - 1; i >= 0; i--) {
      daysArray.push({ day: prevMonthDays - i, month: -1 }) // días del mes anterior
    }

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push({ day, month: parsedMonth }) // días del mes actual
    }

    const remaining = 7 - (daysArray.length % 7)
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        daysArray.push({ day: i, month: -2 }) // días del mes siguiente
      }
    }

    const weeks = []
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7))
    }

    return weeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ day, month: cellMonth }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex
          const usedMonth = cellMonth < 0 ? parsedMonth : cellMonth

          const isToday =
            today.getFullYear() === parsedYear &&
            today.getMonth() === usedMonth &&
            today.getDate() === day

          return (
            <div
              key={`${cellMonth}-${day}-${weekIndex}`}
              ref={(el) => {
                dayRefs.current[index] = el
              }}
              data-month={usedMonth}
              data-day={day}
              onClick={
                cellMonth < 0
                  ? undefined
                  : () => handleDayClick(day, usedMonth, parsedYear)
              }
              className={`relative z-10 m-[-0.5px] aspect-square w-full grow rounded-xl font-medium transition-all ${cellMonth < 0 ? "cursor-default border-0 bg-transparent text-gray-300" : "cursor-pointer border hover:z-20 hover:border-cyan-400"} sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40`}
            >
              <span className="flex flex-col items-center text-center">
                <span
                  className={`text-base font-semibold ${
                    cellMonth < 0 ? "text-gray-300" : ""
                  }`}
                >
                  {day}
                </span>
                {cellMonth >= 0 &&
                  (() => {
                    const dateObj = new Date(parsedYear, usedMonth, day)
                    const dateKey = dateObj.toISOString().split("T")[0]
                    const value = values[dateKey]

                    if (value) {
                      return (
                        <span className="text-x mt-1 font-medium text-gray-400">
                          ${value.toLocaleString()}
                        </span>
                      )
                    }
                    return null
                  })()}
              </span>
            </div>
          )
        })}
      </div>
    ))
  }, [parsedMonth, parsedYear, values])

  return (
    <div className="no-scrollbar calendar-container max-h-full overflow-y-scroll rounded-t-2xl bg-white pb-10 text-slate-800 shadow-xl">
      <div className="-top-px z-50 w-full rounded-t-2xl bg-white px-5 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-4 flex w-full items-center justify-center">
          <h1 className="text-xl font-semibold capitalize">
            {new Date(parsedYear, parsedMonth).toLocaleDateString("es-MX", {
              month: "long",
              year: "numeric",
            })}
          </h1>
        </div>
        <div className="grid w-full grid-cols-7 justify-between text-slate-500">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="w-full border-b border-slate-200 py-2 text-center font-semibold"
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">{generateCalendar}</div>
    </div>
  )
}
