import { isBefore } from "date-fns"
import {
  NEXT_STATUS_MAP,
  NEXT_STATUS_MAP_FOR_ADMIN,
  PaymentStatuses,
} from "@/constants"

export function toTitleCase(str) {
  if (typeof str !== "string") return ""
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function mapToOptions(input, labelFn = toTitleCase) {
  const list = Array.isArray(input)
    ? input
    : Array.isArray(input?.data)
      ? input.data
      : []

  return list.map((item) => ({
    label: labelFn(item.name || item),
    value: item.id ?? item,
  }))
}
export function formatDate(date, opts = {}) {
  if (!date) return ""

  try {
    const formatted = new Intl.DateTimeFormat("es-MX", {
      month: opts.month ?? "short",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      timeZone: "UTC",
      ...opts,
    }).format(new Date(date))

    return toTitleCase(formatted)
  } catch (_err) {
    return ""
  }
}

export function toURLSearchParams(params) {
  const searchParams = new URLSearchParams()

  if (!params || typeof params !== "object") {
    return searchParams
  }

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null) {
          searchParams.append(key, v)
        }
      })
    } else if (value !== undefined && value !== null) {
      searchParams.set(key, value)
    }
  })

  return searchParams
}

export function formatCurrency(cents) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

export const getYearOptions = (yearsBack = 6) => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: yearsBack }, (_, i) => {
    const year = currentYear - i
    return { label: year.toString(), value: year.toString() }
  })
}

export const mapVentasGlobalesToChartData = (data = {}) => [
  { title: "Enero", description: data.january ?? 0 },
  { title: "Febrero", description: data.february ?? 0 },
  { title: "Marzo", description: data.march ?? 0 },
  { title: "Abril", description: data.april ?? 0 },
  { title: "Mayo", description: data.may ?? 0 },
  { title: "Junio", description: data.june ?? 0 },
  { title: "Julio", description: data.july ?? 0 },
  { title: "Agosto", description: data.august ?? 0 },
  { title: "Septiembre", description: data.september ?? 0 },
  { title: "Octubre", description: data.october ?? 0 },
  { title: "Noviembre", description: data.november ?? 0 },
  { title: "Diciembre", description: data.december ?? 0 },
]
export const getNextStatuses = (currentStatus, isAdmin = false) => {
  return (
    (isAdmin ? NEXT_STATUS_MAP_FOR_ADMIN : NEXT_STATUS_MAP)[currentStatus] ?? []
  )
}

export function shouldDisableVoucher(order, canCreateOrder) {
  const isPaid = order.status === PaymentStatuses.PAID

  const isExpired = order.expiration_date
    ? isBefore(new Date(order.expiration_date), new Date())
    : false

  return (isPaid || isExpired) && canCreateOrder
}

export function getCurrentMonthYear() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const year = String(now.getFullYear())

  return { month, year }
}
