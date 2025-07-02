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
