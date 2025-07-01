export const getParsedVacantParams = (pagination, filters) => {
  const required = ["country", "category"]

  const isComplete = required.every((key) =>
    filters.find((f) => f.id === key && f.value)
  )

  if (!isComplete) return null

  const params = {
    skip: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
  }

  filters.forEach((filter) => {
    switch (filter.id) {
      case "country":
        params.country = filter.value
        break
      case "location_state_province":
        params.state = filter.value
        break
      case "category":
        params.category = filter.value
        break
      case "min_rate":
        params.min_rate = filter.value
        break
      case "max_rate":
        params.max_rate = filter.value
        break
      case "min_popularity":
        params.min_popularity = filter.value
        break
      default:
        break
    }
  })

  return params
}
