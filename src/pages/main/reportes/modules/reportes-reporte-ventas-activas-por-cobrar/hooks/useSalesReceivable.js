import {
  useGetActiveSalesReceivable,
  useGetActiveSalesReceivableByGroup,
} from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"

export const useSalesReceivable = () => {
  const { isSuperAdmin, isAdmin, group, user } = useCurrentUser()

  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isSuperAdmin ? "" : group?.id || "",
  })

  let salesQuery

  if (isSuperAdmin || isAdmin) {
    salesQuery = useGetActiveSalesReceivableByGroup(
      { group_id: isSuperAdmin ? values?.group_id : group?.id || "" },
      { enabled: !isSuperAdmin }
    )
  } else {
    salesQuery = useGetActiveSalesReceivable({
      user_id: user?.id,
    })
  }

  const { data, isFetched, isFetching, isError, refetch } = salesQuery

  const handleSearch = async () => {
    await refetch()
  }

  const normalizedData = (() => {
    if (!data) return []
    if (isSuperAdmin || isAdmin) {
      return data.users
        .filter((user) => user.records?.length > 0)
        .map((user) => ({
          username: user.username,
          total_to_be_collected: user.total_to_be_collected,
          records: user.records,
        }))
    } else {
      return [
        {
          username: data.username,
          total_to_be_collected: data.total_to_be_collected,
          records: data.records,
        },
      ]
    }
  })()

  return {
    data: normalizedData,
    total_to_be_collected: data?.total_to_be_collected,
    isFetched,
    isFetching,
    isError,
    values,
    onChange,
    listOfGroups,
    handleSearch,
  }
}
