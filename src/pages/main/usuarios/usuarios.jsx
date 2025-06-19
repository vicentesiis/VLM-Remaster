import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import React, { useState } from "react"
import { toast } from "sonner"
import UsuarioDialog from "@/components/customs/dialogs/usuario-dialog"
import { groupConfig } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
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
  const { role, group, isAdmin, isSuperAdmin, isAgent } = useUserPermissions()
  const initialGroupId = group?.id ?? ""
  const { groups } = useCodexData(role)
  const listOfGroups = extractAndMapToOptions(groups)

  const { values, onChange } = useFiltersState({ group_id: "" })
  const [selectedGroupId, setSelectedGroupId] = useState(
    isSuperAdmin ? null : initialGroupId
  )
  const [hasSearched, setHasSearched] = useState(false)

  const shouldFetch =
    (isSuperAdmin && hasSearched && selectedGroupId) ||
    (!isSuperAdmin && selectedGroupId)

  const {
    data: response,
    isLoading,
    isError,
  } = useGetGroupById(
    {
      group_searchable_id: selectedGroupId,
      with_members: true,
    },
    { enabled: !!shouldFetch }
  )

  const data = response?.data ?? {}
  const members = data?.members ?? []
  const admin = data?.admin ?? {}
  const leader = data?.leader ?? {}

  const handleSearch = () => {
    if (!values.group_id) {
      toast.error("El Grupo es necesario para el proceso")
      return
    }

    setSelectedGroupId(values.group_id)
    setHasSearched(true)
  }

  const title = isSuperAdmin
    ? "Usuarios por Grupo"
    : isAdmin
      ? "Usuarios de tu Grupo"
      : isAgent
        ? "Información de tu Grupo"
        : "Usuarios"

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)

  const handleEdit = (user) => {
    setUserToEdit(user)
    setIsDialogOpen(true)
  }

  const columns = getUsuarioColumns(handleEdit)

  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <PageLayout title={title}>
      {isAdmin && (
        <div className="absolute right-0 top-2 z-10">
          <UsuarioDialog />
        </div>
      )}
      <Card>
        <CardContent>
          <SectionHeader
            title="Usuarios"
            actions={
              isSuperAdmin && listOfGroups.length > 0 ? (
                <FilterToolbar
                  filterConfig={[groupConfig]}
                  values={values}
                  onChange={onChange}
                  context={{ groups: listOfGroups }}
                  onSearch={handleSearch}
                />
              ) : null
            }
          />

          {shouldFetch ? (
            <WithStatusState isLoading={isLoading} isError={isError}>
              <div className="flex gap-4">
                <div className="flex w-[270px] flex-col gap-2">
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
                />
              </div>
            </WithStatusState>
          ) : isSuperAdmin ? (
            <p className="mt-4 text-center text-muted-foreground">
              Selecciona un grupo y presiona <strong>Buscar</strong> para
              continuar.
            </p>
          ) : null}
        </CardContent>
      </Card>

      <UsuarioDialog
        mode="edit"
        userToEdit={userToEdit}
        trigger={null}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </PageLayout>
  )
}

export default Usuarios
