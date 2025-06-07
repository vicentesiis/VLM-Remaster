export const getParsedParams = (pagination, appliedFilters, title, role) => {
  const params = {
    skip: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    record_type: "prospect",
  }

  if (title === "Clientes" || title === "Mis Clientes") {
    params.is_client = true
  }

  if (role === "super_admin" || role === "admin") {
    params.group_id = "7d57f432-f831-43cd-9fcc-bd85ce51a7c4"
  }

  for (const filter of appliedFilters) {
    if (filter.id === "status") {
      params.status = filter.value[0]
    }

    if (filter.id === "created_at" && Array.isArray(filter.value)) {
      const [from, to] = filter.value
      if (from) params.from = new Date(from).toISOString()
      if (to) params.to = new Date(to).toISOString()
    }
  }
  console.log(params)
  return params
}
