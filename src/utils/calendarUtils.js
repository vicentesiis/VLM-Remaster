export function getCalendarWeeks(parsedMonth, parsedYear) {
  const today = new Date()
  const daysInMonth = new Date(parsedYear, parsedMonth + 1, 0).getDate()
  const startDay = new Date(parsedYear, parsedMonth, 1).getDay()
  const daysArray = []

  const { month: prevMonth, year: prevYear } = getPreviousMonthInfo(
    parsedMonth,
    parsedYear
  )
  const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate()

  // Add days from previous month for alignment
  for (let i = startDay - 1; i >= 0; i--) {
    daysArray.push({ day: prevMonthDays - i, month: -1 })
  }

  // Add days for current month
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push({ day, month: parsedMonth })
  }

  // Add padding days for next month
  const remaining = 7 - (daysArray.length % 7)
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      daysArray.push({ day: i, month: -2 })
    }
  }

  // Break into weeks
  const weeks = []
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7))
  }

  return { weeks, today }
}

export function parseMonthYear(month, year) {
  const numericMonth = Number(month)
  const numericYear = Number(year)

  if (Number.isNaN(numericMonth) || Number.isNaN(numericYear)) {
    throw new Error("Invalid month or year")
  }

  return {
    zeroBasedMonth: numericMonth - 1, // for JS Date
    numericYear,
  }
}

export function getDateKey(date) {
  return date.toISOString().split("T")[0]
}

export function isFutureDate(date) {
  const now = new Date()
  return date > now
}





export function getPreviousMonthInfo(month, year) {
  if (month === 0) {
    return { month: 11, year: year - 1 }
  }
  return { month: month - 1, year }
}

export const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
