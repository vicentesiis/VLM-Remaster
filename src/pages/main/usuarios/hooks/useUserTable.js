import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { getUsuarioColumns } from "@/components/customs/table/columns/usuarioColumns"
import { useGetGroupById } from "@/hooks/queries"

export const useUserTable = () => {
  const { data, isLoading, isError } = useGetGroupById({
    group_searchable_id: "7d57f432-f831-43cd-9fcc-bd85ce51a7c4",
    with_members: true,
  })

  const columns = getUsuarioColumns()

  const table = useReactTable({
    data: data?.data.members ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return { table, isLoading, isError }
}
