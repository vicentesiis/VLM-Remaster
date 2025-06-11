import { Roles } from "@/constants/appConstants"

export const getParsedParams = (pagination, appliedFilters, title, role) => {
  const params = new URLSearchParams()

  params.set("skip", pagination.pageIndex * pagination.pageSize)
  params.set("limit", pagination.pageSize)

  if (role !== Roles.SUPER_ADMIN) {
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

    if (role === Roles.SUPER_ADMIN) {
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

  console.log("Parsed Params:", params.toString())
  console.log("Params:", params)

  return params
}
