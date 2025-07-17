import { useMemo, useState, useEffect } from "react"
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useGetFinalizedReport } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { getFinalizedReportColumns } from "@/components/customs/table/columns/FinalizedColumns"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { toast } from "sonner"

export const useFinalizedReportTable = () => {
  const { isAdmin, group } = useCurrentUser()
  const isSuperAdmin = isAdmin

  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isSuperAdmin ? "" : group?.id || "",
  })

  const selectedGroupId = values.group_id
  const [searchTriggered, setSearchTriggered] = useState(false)

  useEffect(() => {
    setSearchTriggered(false)
  }, [selectedGroupId])

  const handleSearch = () => {
    if (!isSuperAdmin && !selectedGroupId) {
      toast.error("Selecciona un grupo antes de buscar")
      return
    }
    setSearchTriggered(true)
  }

  const { data, isFetching, isError, isFetched } = useGetFinalizedReport(
    {
      skip: 0,
      limit: 100,
      ...(isSuperAdmin ? {} : { group_id: selectedGroupId }),
    },
    { enabled: searchTriggered }
  )

  const transformedData = useMemo(() => {
    return (
      data?.records_and_orders?.map(([record, orderCount]) => ({
        ...record,
        orderCount,
      })) ?? []
    )
  }, [data])

  const showTableData = searchTriggered && isFetched
  const table = useReactTable({
    data: showTableData ? transformedData : [],
    columns: getFinalizedReportColumns(),
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    table,
    isFetching: searchTriggered && isFetching,
    isError,
    isFetched: showTableData,
    showFilters: true,
    values,
    onChange,
    listOfGroups,
    isSuperAdmin,
    handleSearch,
  }
}
