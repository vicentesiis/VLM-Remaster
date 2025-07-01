import { usePotencialColumns } from "@/components/customs/table/columns/potentialColumns"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

export const usePotencialTable  = (records = []) => {
  const columns = usePotencialColumns()

  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return { table }
}