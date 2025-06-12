export const getParsedRecordParams = (
  pagination,
  appliedFilters,
  title,
  userId,
  currentRole
) => {
  const params = {}

  // Pagination
  params.skip = pagination.pageIndex * pagination.pageSize
  params.limit = pagination.pageSize

  if (title === "Clientes" || title === "Mis Clientes") {
    params.is_client = true
  }

  const roleHandlers = {
    super_admin: handleSuperAdminFilters,
    agent: handleAgentFilters,
  }

  const handleFilters = roleHandlers[currentRole] ?? handleDefaultFilters
  handleFilters(params, appliedFilters, title, userId)
  handleCommonFilters(params, appliedFilters)

  return params
}

// Handlers
function handleSuperAdminFilters(params, filters) {
  for (const filter of filters) {
    if (filter.id === "group_id") {
      params.group_id = filter.value
    }

    if (filter.id === "channel") {
      params.channels = filter.value
    }

    if (filter.id === "program") {
      params.programs = filter.value
    }

    if (filter.id === "record_type") {
      params.record_type = filter.value
    }
  }
}

function handleAgentFilters(params, filters, title, userId) {
  params.user_id = userId

  if (title === "Mis Registros") {
    params.record_type = "prospect"
  } else if (title === "Mis Leads") {
    params.record_type = "lead"
  }
}

function handleCommonFilters(params, filters) {
  for (const filter of filters) {
    if (filter.id === "status") {
      params.statuses = filter.value
    }

    if (filter.id === "updated_at" && Array.isArray(filter.value)) {
      const [from, to] = filter.value
      if (from) params.start_date = new Date(from).toISOString()
      if (to) params.end_date = new Date(to).toISOString()
    }
  }
}

function handleDefaultFilters() {}
