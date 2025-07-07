import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { useGetAgentCutOff } from "@/hooks/queries/UseReports"
import { getOrdersColumns } from "@/components/customs/table/columns/orderColumns"
import { userConfig, groupConfig } from "@/components/customs/filter/filter-config"
import { useState, useEffect, useMemo, useCallback } from "react"
import { toast } from "sonner"
import { downloadAgentCutOff } from "@/services/documentService"

export const useCorteTable = () => {
  const { isAdmin, group } = useCurrentUser()
  const isSuperAdmin = isAdmin

  const { values, onChange, listOfUsers, listOfGroups } = useGroupAndMembersFilter({
    group_id: isSuperAdmin ? "" : group?.id || "",
    user_id: "",
  })

  const selectedUserId = values.user_id
  const [searchTriggered, setSearchTriggered] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    setSearchTriggered(false)
  }, [selectedUserId])

  const handleSearch = () => {
    if (!selectedUserId) {
      toast.error("El agente es requerido")
      return
    }
    setSearchTriggered(true)
  }

  const handleDownloadCutOff = useCallback(async () => {
    if (!selectedUserId) {
      toast.error("Selecciona un agente para descargar el corte")
      return
    }

    setIsDownloading(true)
    try {
      await downloadAgentCutOff(selectedUserId)
      toast.success("Corte descargado correctamente")
    } catch (error) {
      toast.error("Hubo un error al descargar el corte")
      console.error("Error downloading cut-off", error)
    } finally {
      setIsDownloading(false)
    }
  }, [selectedUserId])
  console.log(selectedUserId)

  const {
    data,
    isFetching,
    isError,
    isFetched,
  } = useGetAgentCutOff(
    { agent_id: selectedUserId },
    { enabled: searchTriggered && !!selectedUserId }
  )

  const orders = useMemo(() => data?.orders ?? [], [data])
  const columns = useMemo(() => getOrdersColumns(), [])

  const showTableData = searchTriggered && isFetched
  const table = useReactTable({
    data: showTableData ? orders : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const filterConfig = [
    ...(listOfGroups.length ? [groupConfig] : []),
    userConfig,
  ]

  return {
    table,
    isFetching: searchTriggered && isFetching,
    isError,
    isFetched: showTableData,
    values,
    onChange,
    listOfUsers,
    listOfGroups,
    filterConfig,
    handleSearch,
    showFilters: true,
    handleDownloadCutOff,
    isDownloading,
  }
}