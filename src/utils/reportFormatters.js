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

  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)

  const dayFormated = new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
  }).format(date)
  const monthFormated = new Intl.DateTimeFormat("es-MX", {
    month: "long",
  }).format(date)

  const capitalizedMonth =
    monthFormated.charAt(0).toUpperCase() + monthFormated.slice(1)

  return `${dayFormated} de ${capitalizedMonth}`
}
