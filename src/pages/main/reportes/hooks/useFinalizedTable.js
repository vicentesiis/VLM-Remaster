import { getFinalizedReportColumns } from "@/components/customs/table/columns/FinalizedColumns"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

export const useFinalizedReportTable = (records = []) => {
  const columns = getFinalizedReportColumns()

  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return { table }
}