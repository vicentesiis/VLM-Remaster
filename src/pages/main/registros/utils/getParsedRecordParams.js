import { Roles } from "@/constants/appConstants"

export const getParsedRecordParams = (
  pagination,
  appliedFilters,
  title,
  userId,
  currentRole
) => {
  const params = {
    skip: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
  }

  if (title === "Clientes") {
    params.is_client = true
  }

  if (title === "Prospectos") {
    params.is_client = false
  }

  applyRoleFilters(params, appliedFilters, title, userId, currentRole)

  return params
}

function applyRoleFilters(params, filters, title, userId, currentRole) {
  if (currentRole === Roles.AGENT) {
    params.user_id = userId
    applyAgentTitleLogic(params, title)
  }

  const roleFilterMap = {
    [Roles.SUPER_ADMIN]: [
      "group_id",
      "channel",
      "program",
      "record_type",
      "status",
      "updated_at",
    ],
    [Roles.ADMIN]: [
      "channel",
      "program",
      "record_type",
      "status",
      "updated_at",
    ],
    [Roles.AGENT]: ["status", "updated_at", "program"],
  }

  const allowedFilters = roleFilterMap[currentRole] || []

  filters.forEach((filter) => {
    if (!allowedFilters.includes(filter.id)) return

    switch (filter.id) {
      case "group_id":
        params.group_id = filter.value
        break
      case "channel":
        params.channels = filter.value
        break
      case "program":
        params.programs = filter.value
        break
      case "record_type":
        params.record_type = filter.value
        break
      case "status":
        params.statuses = filter.value
        break
      case "updated_at":
        if (Array.isArray(filter.value)) {
          const [from, to] = filter.value
          if (from) params.start_date = new Date(from).toISOString()
          if (to) params.end_date = new Date(to).toISOString()
        }
        break
      default:
        break
    }
  })
}

function applyAgentTitleLogic(params, title) {
  if (title === "Prospectos") {
    params.record_type = "prospect"
  } else if (title === "Leads") {
    params.record_type = "lead"
  }
}
