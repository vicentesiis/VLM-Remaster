export const extractList = (response) => {
  return response?.data?.data ?? []
}

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  )
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
