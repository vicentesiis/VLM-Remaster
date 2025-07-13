import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useState, useEffect, useMemo, useCallback } from "react"
import { toast } from "sonner"
import {
  userConfig,
  groupConfig,
} from "@/components/customs/filter/filter-config"
import { getCorteColumns } from "@/components/customs/table/columns/corteColumns"
import { useGetAgentCutOff } from "@/hooks/queries/UseReports"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
import { downloadAgentCutOff } from "@/services/documentService"

export const useCorteTable = () => {
  const { isAdmin, group } = useCurrentUser()
  const isSuperAdmin = isAdmin

  const { values, onChange, listOfUsers, listOfGroups } =
    useGroupAndMembersFilter({
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
    setSearchTriggered(true)
  }



  const {
    data,
    isFetching,
    isError,
    isFetched,
    refetch,
  } = useGetAgentCutOff(
    { agent_id: selectedUserId },
    { enabled: searchTriggered && !!selectedUserId }
  )

  const orders = useMemo(() => data?.orders ?? [], [data])
  const columns = useMemo(() => getCorteColumns(), [])

  const showTableData = searchTriggered && isFetched
  const table = useReactTable({
    data: showTableData ? orders : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const totalAmount = useMemo(() => {
    return orders.reduce((acc, order) => acc + (order.amount || 0), 0)
  }, [orders])
  
  const totalOrders = orders.length
  const handleDownloadCutOff = useCallback(async () => {
    if (!selectedUserId) {
      toast.error("Selecciona un agente para descargar el corte")
      return
    }
  
    if (orders.length === 0) {
      toast.error("Este agente ya no tiene órdenes pendientes por cortar.")
      return
    }
  
    setIsDownloading(true)
    try {
      await downloadAgentCutOff(selectedUserId)
      toast.success("Corte descargado correctamente")
      
      // ✅ vuelve a consultar datos actualizados después de cortar
      await refetch()
    } catch (error) {
      toast.error("Hubo un error al descargar el corte")
      console.error("Error downloading cut-off", error)
    } finally {
      setIsDownloading(false)
    }
  }, [selectedUserId, orders, refetch])
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
    totalOrders,
    totalAmount,
    listOfGroups,
    filterConfig,
    searchTriggered,
    orders,
    handleSearch,
    showFilters: true,
    handleDownloadCutOff,
    isDownloading,
  }
}
