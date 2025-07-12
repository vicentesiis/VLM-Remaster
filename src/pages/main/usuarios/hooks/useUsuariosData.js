import { useMemo, useState } from "react"
import { toast } from "sonner"
import { useGetGroupById, useGetGroups } from "@/hooks/queries"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useFiltersState } from "@/hooks/useFiltersState"
import { mapToOptions } from "@/utils"

export function useUsuariosData() {
  const { role, group, isAdmin, isSuperAdmin, isAgent } = useCurrentUser()
  const initialGroupId = group?.id ?? ""
  const [selectedGroupId, setSelectedGroupId] = useState(
    isSuperAdmin ? null : initialGroupId
  )

  const shouldFetch =
    (isSuperAdmin && selectedGroupId) || (!isSuperAdmin && selectedGroupId)

  const groups = useGetGroups({ enabled: isSuperAdmin })

  const listOfGroups = mapToOptions(groups.data)

  const { values, onChange } = useFiltersState({ group_id: "" })

  const {
    data: response,
    isLoading,
    isFetching,
    isFetched,
    isError,
    refetch,
  } = useGetGroupById(
    { group_searchable_id: selectedGroupId, with_members: true },
    { enabled: !!shouldFetch }
  )

  const rawMembers = response?.data?.members ?? []

  const members = useMemo(() => {
    if (isAgent) {
      return rawMembers.filter((user) => user.active)
    }
    return rawMembers
  }, [rawMembers, isAgent])
  const admin = response?.data?.admin ?? {}
  const leader = response?.data?.leader ?? {}

  const groupName = isSuperAdmin
    ? response?.data?.name || ""
    : group?.name || ""

  return {
    role,
    isAdmin,
    isSuperAdmin,
    isAgent,
    groupName: groupName,
    selectedGroupId,
    setSelectedGroupId,
    shouldFetch,
    values,
    onChange,
    handleSearch: () => {
      setSelectedGroupId(values.group_id)
      refetch()
    },
    listOfGroups,
    members,
    admin,
    leader,
    isLoading,
    isError,
    isFetching,
    isFetched,
  }
}
