export const getParsedRecordParams = (pagination, appliedFilters, title, isSuperAdmin) => {
  const params = new URLSearchParams()

  params.set("skip", pagination.pageIndex * pagination.pageSize)
  params.set("limit", pagination.pageSize)

  if (!isSuperAdmin) {
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

    if (isSuperAdmin) {
      if (filter.id === "group_id") {
        params.append("group_id", filter.value)
      }

      if (filter.id === "channel") {
        for (const channel of filter.value) {
          params.append("channels", channel)
        }
      }

      if (filter.id === "program") {
        for (const program of filter.value) {
          params.append("programs", program)
        }
      }
      if (filter.id === "record_type") {
        params.append("record_type", filter.value)
      }
    }

    if (filter.id === "updated_at" && Array.isArray(filter.value)) {
      const [from, to] = filter.value
      if (from) params.set("start_date", new Date(from).toISOString())
      if (to) params.set("end_date", new Date(to).toISOString())
    }
  }

  return params
}
