export const getParsedRecordParams = (
  pagination,
  appliedFilters,
  title,
  userId,
  currentRole
) => {
  const params = new URLSearchParams()

  // 1. Pagination
  params.set("skip", pagination.pageIndex * pagination.pageSize)
  params.set("limit", pagination.pageSize)

  // 2. Title-based client logic (shared across roles)
  if (title === "Clientes" || title === "Mis Clientes") {
    params.set("is_client", "true")
  }

  // 3. Role-specific filter handling
  const roleHandlers = {
    super_admin: handleSuperAdminFilters,
    agent: handleAgentFilters,
  }

  const handleFilters = roleHandlers[currentRole] ?? handleDefaultFilters
  handleFilters(params, appliedFilters, title, userId)

  // 4. Common filters
  handleCommonFilters(params, appliedFilters)

  return params
}

// Handlers
function handleSuperAdminFilters(params, filters) {
  for (const filter of filters) {
    if (filter.id === "group_id") {
      params.append("group_id", filter.value)
    }

    if (filter.id === "channel") {
      for (const value of filter.value) {
        params.append("channels", value)
      }
    }

    if (filter.id === "program") {
      for (const value of filter.value) {
        params.append("programs", value)
      }
    }

    if (filter.id === "record_type") {
      params.append("record_type", filter.value)
    }
  }
}

function handleAgentFilters(params, filters, title, userId) {
  params.set("user_id", userId)

  if (title === "Mis Registros") {
    params.set("record_type", "prospect")
  } else if (title === "Mis Leads") {
    params.set("record_type", "lead")
  }
}

function handleCommonFilters(params, filters) {
  for (const filter of filters) {
    if (filter.id === "status") {
      for (const status of filter.value) {
        params.append("statuses", status)
      }
    }

    if (filter.id === "updated_at" && Array.isArray(filter.value)) {
      const [from, to] = filter.value
      if (from) params.set("start_date", new Date(from).toISOString())
      if (to) params.set("end_date", new Date(to).toISOString())
    }
  }
}

function handleDefaultFilters() {
}
