import { useMemo } from "react"
import { useGetGroups, useGetGroupById } from "@/hooks/queries"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useFiltersState } from "@/hooks/useFiltersState"
import { mapToOptions } from "@/utils"

export function useGroupAndMembersFilter(initialFilterValues) {
  const {
    isSuperAdmin,
    isAdmin,
    isLeader,
    group: adminGroup,
  } = useCurrentUser()

  const groupsQuery = useGetGroups({ enabled: isSuperAdmin })

  const groupByIdQuery = useGetGroupById(
    { group_searchable_id: adminGroup?.id, with_members: true },
    { enabled: (isAdmin || isLeader) && !!adminGroup?.id }
  )

  const { values, onChange, reset } = useFiltersState(initialFilterValues)

  const listOfGroups = mapToOptions(groupsQuery.data?.data)

  const listOfUsers = useMemo(() => {
    if (isSuperAdmin) {
      if (!values.group_id) return []
      const selectedGroup = groupsQuery.data?.data?.find(
        (g) => g.id === values.group_id
      )
      return mapToOptions(selectedGroup?.members || [])
    }

    if (isAdmin || isLeader) {
      return mapToOptions(groupByIdQuery.data?.data?.members || [])
    }

    return []
  }, [
    isSuperAdmin,
    isAdmin,
    isLeader,
    groupsQuery.data,
    groupByIdQuery.data,
    values.group_id,
  ])

  return {
    values,
    onChange,
    reset,
    listOfGroups,
    listOfUsers,
    groupsQuery,
    groupByIdQuery,
  }
}
