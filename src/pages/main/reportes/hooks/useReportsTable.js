import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { getOrdersColumns } from "@/components/customs/table/columns/orderColumns"

export const useReportTable = (orders = []) => {
    const columns = getOrdersColumns()
  
    const table = useReactTable({
      data: orders,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
  
    return { table }
  }