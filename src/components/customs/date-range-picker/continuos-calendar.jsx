"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const ContinuousCalendar = ({ onClick, values = {} }) => {
  const today = new Date()
  const dayRefs = useRef([])
  const [year, setYear] = useState(today.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
  const monthOptions = monthNames.map((month, index) => ({
    name: month,
    value: `${index}`,
  }))

  const scrollToDay = (monthIndex, dayIndex) => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) =>
        ref &&
        ref.getAttribute("data-month") === `${monthIndex}` &&
        ref.getAttribute("data-day") === `${dayIndex}`
    )

    const targetElement = dayRefs.current[targetDayIndex]

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.querySelector(".calendar-container")
      const elementRect = targetElement.getBoundingClientRect()
      const is2xl = window.matchMedia("(min-width: 1536px)").matches
      const offsetFactor = is2xl ? 3 : 2.5

      if (container) {
        const containerRect = container.getBoundingClientRect()
        const offset =
          elementRect.top -
          containerRect.top -
          containerRect.height / offsetFactor +
          elementRect.height / 2

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: "smooth",
        })
      } else {
        const offset =
          window.scrollY +
          elementRect.top -
          window.innerHeight / offsetFactor +
          elementRect.height / 2

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        })
      }
    }
  }

  const handlePrevYear = () => setYear((prev) => prev - 1)
  const handleNextYear = () => setYear((prev) => prev + 1)

  const handleMonthChange = (e) => {
    const monthIndex = parseInt(e.target.value, 10)
    setSelectedMonth(monthIndex)
    scrollToDay(monthIndex, 1)
  }

  const handleDayClick = (day, month, year) => {
    if (!onClick) return
    if (month < 0) {
      onClick(day, 11, year - 1)
    } else {
      onClick(day, month, year)
    }
  }

  const generateCalendar = useMemo(() => {
    const today = new Date()
    const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate()
    const startDay = new Date(year, selectedMonth, 1).getDay()
    const daysArray = []

    const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1
    const prevYear = selectedMonth === 0 ? year - 1 : year
    const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate()

    for (let i = startDay - 1; i >= 0; i--) {
      daysArray.push({ day: prevMonthDays - i, month: -1 })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push({ day, month: selectedMonth })
    }

    const remaining = 7 - (daysArray.length % 7)
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        daysArray.push({ day: i, month: -2 })
      }
    }

    const weeks = []
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7))
    }

    return weeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ day, month }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === selectedMonth &&
            today.getDate() === day

          return (
            <div
              key={`${month}-${day}-${weekIndex}`}
              ref={(el) => {
                dayRefs.current[index] = el
              }}
              data-month={selectedMonth}
              data-day={day}
              onClick={() =>
                handleDayClick(day, month < 0 ? selectedMonth : month, year)
              }
              className="group relative z-10 m-[-0.5px] aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40"
            >
              <span className="flex flex-col items-center text-center">
                <span
                  className={`text-base font-semibold ${
                    month < 0 ? "text-gray-300" : ""
                  }`}
                >
                  {day}
                </span>
                {month >= 0 && (() => {
                  const dateObj = new Date(year, month, day)
                  const dateKey = dateObj.toISOString().split("T")[0]
                  const value = values[dateKey]

                  if (value) {
                    return (
                      <span className="mt-1 text-x font-medium text-gray-400">
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
  }, [year, selectedMonth, values])

  return (
    <div className="no-scrollbar calendar-container max-h-full overflow-y-scroll rounded-t-2xl bg-white pb-10 text-slate-800 shadow-xl">
      <div className="-top-px z-50 w-full rounded-t-2xl bg-white px-5 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Select
              name="month"
              value={`${selectedMonth}`}
              options={monthOptions}
              onChange={handleMonthChange}
            />
          </div>
          <div className="flex w-fit items-center justify-between">
            <button
              onClick={handlePrevYear}
              className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
            >
              <svg
                className="size-5 text-slate-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl">
              {year}
            </h1>
            <button
              onClick={handleNextYear}
              className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
            >
              <svg
                className="size-5 text-slate-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </div>
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

export const Select = ({
  name,
  value,
  label,
  options = [],
  onChange,
  className,
}) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-gray-300 bg-white py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg
        className="size-5 text-slate-600"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
)