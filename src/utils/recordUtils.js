export const getParsedParams = (pagination, appliedFilters, title, role) => {
  const params = new URLSearchParams()

  params.set("skip", pagination.pageIndex * pagination.pageSize)
  params.set("limit", pagination.pageSize)

  if (role !== "super_admin") {
    params.set("record_type", "prospect")
  }

  if (title === "Clientes" || title === "Mis Clientes") {
    params.set("is_client", "true")
  }

  for (const filter of appliedFilters) {
    if (filter.id === "status") {
      for (const status of filter.value) {
        params.append("statuses", status)
      }
    }

    if (role === "super_admin") {
      if (filter.id === "group_id") {
        params.append("group_id", filter.value)
      }
    }

    if (filter.id === "updated_at" && Array.isArray(filter.value)) {
      const [from, to] = filter.value
      if (from) params.set("start_date", new Date(from).toISOString())
      if (to) params.set("end_date", new Date(to).toISOString())
    }
  }

  return Object.fromEntries(params.entries())
}
