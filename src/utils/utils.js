import { isBefore } from "date-fns"
import {
  NEXT_STATUS_MAP,
  NEXT_STATUS_MAP_FOR_ADMIN,
  PaymentStatuses,
  CURRENCY_CONFIG,
  JOB_CATEGORIES_MAP,
  MONTH_NAMES,
} from "@/constants"

// ============================================================================
// STRING UTILITIES
// ============================================================================

/**
 * Converts a string to title case (first letter of each word capitalized)
 * @param {string} str - The string to convert
 * @returns {string} The title-cased string
 */
export function toTitleCase(str) {
  if (typeof str !== "string") return ""
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// ============================================================================
// DATA TRANSFORMATION UTILITIES
// ============================================================================

/**
 * Maps input data to options format for select components
 * @param {Array|Object} input - Input data (array or object with data property)
 * @param {Function} labelFn - Function to format labels (defaults to toTitleCase)
 * @returns {Array} Array of {label, value} objects
 */
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

/**
 * Converts URL parameters object to URLSearchParams
 * @param {Object} params - Parameters object
 * @returns {URLSearchParams} URLSearchParams instance
 */
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

// ============================================================================
// DATE & TIME UTILITIES
// ============================================================================

/**
 * Formats a date using Mexican locale and timezone
 * @param {string|Date} date - Date to format
 * @param {Object} opts - Formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(date, opts = {}) {
  if (!date) return ""

  const showTime = opts.showTime ?? false

  try {
    const formatted = new Intl.DateTimeFormat("es-MX", {
      month: opts.month ?? "short",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...(showTime && {
        hour: opts.hour ?? "2-digit",
        minute: opts.minute ?? "2-digit",
      }),
      timeZone: opts.timeZone ?? "America/Mexico_City",
      ...opts,
    }).format(new Date(date))

    return formatted
  } catch {
    return ""
  }
}

/**
 * Gets current month and year as zero-padded strings
 * @returns {Object} Object with month and year properties
 */
export function getCurrentMonthYear() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const year = String(now.getFullYear())

  return { month, year }
}

/**
 * Generates year options for dropdowns
 * @param {number} yearsBack - Number of years to go back from current year
 * @returns {Array} Array of {label, value} year options
 */
export function getYearOptions(yearsBack = 6) {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: yearsBack }, (_, i) => {
    const year = currentYear - i
    return { label: year.toString(), value: year.toString() }
  })
}

// ============================================================================
// CURRENCY & FORMATTING UTILITIES
// ============================================================================

/**
 * Formats currency amount to display format
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (USD, MXN, etc.)
 * @param {Object} options - Additional options
 * @param {boolean} options.fromCents - Whether amount is in cents (default: true)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = "USD", options = {}) {
  const { fromCents = true, ...intlOptions } = options
  const value = fromCents ? amount / 100 : amount
  const needsDecimals = value % 1 !== 0
  const config = CURRENCY_CONFIG[currency.toUpperCase()] || CURRENCY_CONFIG.USD
  
  const formatted = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: needsDecimals ? 2 : 0,
    maximumFractionDigits: 2,
    ...intlOptions
  }).format(value)
  
  return `${config.symbol}${formatted} ${currency.toUpperCase()}`
}

// ============================================================================
// CHART & DATA VISUALIZATION UTILITIES
// ============================================================================

/**
 * Maps global sales data to chart format
 * @param {Object} data - Sales data object with month properties
 * @returns {Array} Array of chart data objects with title and description
 */
export function mapVentasGlobalesToChartData(data = {}) {
  const monthKeys = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ]
  
  return MONTH_NAMES.map((monthName, index) => ({
    title: monthName,
    description: data[monthKeys[index]] ?? 0,
  }))
}

// ============================================================================
// STATUS & WORKFLOW UTILITIES
// ============================================================================

/**
 * Gets available next statuses based on current status and user role
 * @param {string} currentStatus - Current record status
 * @param {boolean} isAdmin - Whether user is admin
 * @returns {Array} Array of available next statuses
 */
export function getNextStatuses(currentStatus, isAdmin = false) {
  return (
    (isAdmin ? NEXT_STATUS_MAP_FOR_ADMIN : NEXT_STATUS_MAP)[currentStatus] ?? []
  )
}

/**
 * Determines if voucher should be disabled based on order status
 * @param {Object} order - Order object
 * @param {boolean} canCreateOrder - Whether user can create orders
 * @returns {boolean} Whether voucher should be disabled
 */
export function shouldDisableVoucher(order, canCreateOrder) {
  const isPaid = order.status === PaymentStatuses.PAID
  const isExpired = order.expiration_date
    ? isBefore(new Date(order.expiration_date), new Date())
    : false

  return (isPaid || isExpired) && canCreateOrder
}

// ============================================================================
// JOB CATEGORY UTILITIES
// ============================================================================

/**
 * Translates job categories from English to Spanish
 * @param {Array} categories - Array of job categories
 * @returns {Array} Array of translated category objects with label and value
 */
export function translateJobCategories(categories) {
  if (!Array.isArray(categories)) return []

  return categories.map((category) => {
    const categoryName =
      typeof category === "string"
        ? category
        : category?.name || category?.label || category

    return {
      label: JOB_CATEGORIES_MAP[categoryName] || categoryName,
      value: categoryName,
    }
  })
}
