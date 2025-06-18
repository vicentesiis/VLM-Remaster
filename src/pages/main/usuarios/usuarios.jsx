import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import React from "react"
import { toast } from "sonner"
import { group } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { getUsuarioColumns } from "@/components/customs/table/columns/usuarioColumns"
import UserRoleCard from "@/components/customs/user-role-card"
import { DataTable } from "@/components/data-table"
import { Card, CardContent } from "@/components/ui"
import { useCodexData } from "@/hooks/queries"
import { useGetGroupById } from "@/hooks/queries"
import { useFiltersState } from "@/hooks/useFiltersState"
import { useUserPermissions } from "@/hooks/useUserPermissions"
import { extractAndMapToOptions } from "@/utils"

const Usuarios = () => {
  const { role } = useUserPermissions()
  const { groups } = useCodexData(role)
  const listOfGroups = extractAndMapToOptions(groups)

  const { values, onChange } = useFiltersState({ group: "" })

  const handleSearch = () => {
    if (!values.group) {
      toast.error("El Grupo es necesario para el proceso")
    }
  }

  const {
    data: response,
    isLoading,
    isError,
  } = useGetGroupById({
    group_searchable_id: "7d57f432-f831-43cd-9fcc-bd85ce51a7c4",
    with_members: true,
  })

  const data = response?.data ?? {}
  const members = data?.members ?? []
  const admin = data?.admin ?? {}
  const leader = data?.leader ?? {}

  const columns = getUsuarioColumns()

  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <PageLayout title="Usuarios por Grupo">
      <Card>
        <CardContent>
          <SectionHeader
            title="Usuarios"
            actions={
              <FilterToolbar
                filterConfig={[group]}
                values={values}
                onChange={onChange}
                context={{ groups: listOfGroups }}
                onSearch={handleSearch}
              />
            }
          />
          <div className="flex gap-4">
            <div className="flex w-[250px] flex-col gap-2">
              <p className="text-lg font-normal">Responsables del Grupo</p>

              <div className="flex flex-col gap-4">
                <UserRoleCard
                  name={admin.name}
                  username={admin.username}
                  role={"admin"}
                  phone={admin.phone}
                />
                <UserRoleCard
                  name={leader.name}
                  username={leader.username}
                  role={"lider"}
                  phone={leader.phone}
                />
              </div>
            </div>
            <DataTable
              table={table}
              isLoading={isLoading}
              isError={isError}
              hasFetched={true}
              showPagination={false}
            ></DataTable>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Usuarios
