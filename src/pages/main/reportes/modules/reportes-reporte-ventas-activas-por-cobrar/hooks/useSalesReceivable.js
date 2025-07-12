import {
  useGetActiveSalesReceivable,
  useGetActiveSalesReceivableByGroup,
} from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export const useSalesReceivable = () => {
  const { isSuperAdmin, isAdmin, isAgent, user } = useCurrentUser()

  let salesQuery

  if (isSuperAdmin || isAdmin) {
    salesQuery = useGetActiveSalesReceivableByGroup({
      group_id: "7d57f432-f831-43cd-9fcc-bd85ce51a7c4",
    })
  } else {
    salesQuery = useGetActiveSalesReceivable({
      user_id: user?.id,
    })
  }

  const { data, isFetched, isFetching, isError, refetch } = salesQuery

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
    refetch,
  }
}
