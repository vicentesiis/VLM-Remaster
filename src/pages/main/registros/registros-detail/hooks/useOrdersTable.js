import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react"
import { getOrdersColumns } from "@/components/customs/table/columns/orderColumns"
import { useGetOrdersByRecord } from "@/hooks/queries/useOrder"

export const useOrdersTable = (recordId, canCreateOrder) => {
  const { data, isLoading, isError, isFetched } = useGetOrdersByRecord({
    record_id: recordId,
  })

  const columns = useMemo(() => getOrdersColumns(canCreateOrder), [canCreateOrder])

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return { table, isLoading, isError, isFetched }
}
