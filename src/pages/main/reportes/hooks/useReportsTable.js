import { getReportColumns } from "@/components/customs/table/columns/reporteColumns"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

export const useReportTable = (orders = []) => {
    const columns = getReportColumns()
  
    const table = useReactTable({
      data: orders,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
  
    return { table }
  }