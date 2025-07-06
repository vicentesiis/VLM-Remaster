export function formatIfExists(value, formatter, fallback = "") {
  return value != null ? formatter(value) : fallback
}

export function formatMonthNYear(month, year) {
  if (!month || !year) return null

  const date = new Date(Number(year), Number(month) - 1)

  const monthName = new Intl.DateTimeFormat("es-MX", {
    month: "long",
  }).format(date)

  const capitalizedMonth =
    monthName.charAt(0).toUpperCase() + monthName.slice(1)
  return `${capitalizedMonth} de ${year}`
}

export function formatLongMonthAndDay(dateStr) {
  if (!dateStr) return ""

  const date = new Date(dateStr)

  const day = new Intl.DateTimeFormat("es-MX", { day: "numeric" }).format(date)
  const month = new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date)

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)

  return `${day} de ${capitalizedMonth}`
}
