import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { usePotencialColumns } from "@/components/customs/table/columns/potentialColumns"

export const usePotencialTable = (records = []) => {
  const columns = usePotencialColumns()
  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return { table }
}
