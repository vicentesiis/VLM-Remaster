export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  )
}

export const extractList = (response) => {
  return response?.data?.data ?? []
}

export function extractAndMapToOptions(response, labelFn = toTitleCase) {
  const list = extractList(response)
  return Array.isArray(list)
    ? list.map((item) => ({
        label: labelFn(item.name || item), // handle both object.name and string
        value: item.id ?? item, // fallback to item if no id
      }))
    : []
}

export const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
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
