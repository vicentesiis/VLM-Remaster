import { useState } from "react"
import { toast } from "sonner"
import { useCodexData, useGetGroupById, useGetGroups } from "@/hooks/queries"
import { useFiltersState } from "@/hooks/useFiltersState"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { extractAndMapToOptions } from "@/utils"

export function useUsuariosData() {
  const { role, group, isAdmin, isSuperAdmin, isAgent } = useCurrentUser()
  const initialGroupId = group?.id ?? ""
  const [selectedGroupId, setSelectedGroupId] = useState(
    isSuperAdmin ? null : initialGroupId
  )
  const [hasSearched, setHasSearched] = useState(false)

  const shouldFetch =
    (isSuperAdmin && hasSearched && selectedGroupId) ||
    (!isSuperAdmin && selectedGroupId)

  const groups = useGetGroups()

  const listOfGroups = extractAndMapToOptions(groups)
  console.log(listOfGroups)

  const { values, onChange } = useFiltersState({ group_id: "" })

  const {
    data: response,
    isLoading,
    isError,
  } = useGetGroupById(
    { group_searchable_id: selectedGroupId, with_members: true },
    { enabled: !!shouldFetch }
  )

  const members = response?.data?.members ?? []
  const admin = response?.data?.admin ?? {}
  const leader = response?.data?.leader ?? {}

  const groupName = isSuperAdmin
    ? response?.data?.name || "En espera de búsqueda"
    : group?.name || ""

  return {
    role,
    isAdmin,
    isSuperAdmin,
    isAgent,
    groupName: groupName,
    selectedGroupId,
    setSelectedGroupId,
    hasSearched,
    setHasSearched,
    shouldFetch,
    values,
    onChange,
    handleSearch: () => {
      if (!values.group_id) {
        toast.error("El Grupo es necesario para el proceso")
        return
      }
      setSelectedGroupId(values.group_id)
      setHasSearched(true)
    },
    listOfGroups,
    members,
    admin,
    leader,
    isLoading,
    isError,
  }
}
