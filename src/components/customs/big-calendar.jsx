import React, { useState, useMemo } from "react"
import { Large, H3, PLead } from "../ui"

export const BigCalendar = ({ date = new Date() }) => {
  const [selectedDay, setSelectedDay] = useState(null)

  const year = date.getFullYear()
  const month = date.getMonth() // 0-indexed
  const startDayOfWeek = new Date(year, month, 1).getDay() // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ]

  // Create placeholder for offset before 1st day
  const calendarDays = useMemo(() => {
    const days = []
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }, [startDayOfWeek, daysInMonth])

  const handleDayClick = (day) => {
    if (day !== null) {
      setSelectedDay(day)
      console.log(`Sales details for day ${day}/${month + 1}/${year}`)
    }
  }

  return (
    <div className="p-4">
      {/* Header for days of the week */}
      <div className="grid h-10 grid-cols-7 gap-2 bg-gray-600 p-2">
        {weekDays.map((dayName) => (
          <div
            key={dayName}
            className="text-center text-sm font-semibold text-white"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, idx) => (
          <div key={idx} className="text-center">
            {day ? (
              <button
                onClick={() => handleDayClick(day)}
                className={`relative flex w-full flex-col items-center justify-center border py-6 transition-all ${
                  selectedDay === day
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {/* Day number in top-right corner */}
                <Large className="absolute right-2 top-2 text-xs font-bold opacity-70">
                  {day}
                </Large>

                <H3 className="text-sm font-bold">$4,503</H3>
              </button>
            ) : (
              <div className="p-4" />
            )}
          </div>
        ))}
      </div>

      {/* Sales Detail */}
      {selectedDay && (
        <div className="mt-6 rounded-lg border bg-gray-50 p-4">
          <H3 className="mb-2 text-lg font-semibold">
            Día: {selectedDay}/{String(month + 1).padStart(2, "0")}/{year}
          </H3>
          <PLead className="text-sm text-muted-foreground">{selectedDay}</PLead>
        </div>
      )}
    </div>
  )
}

export default BigCalendar
