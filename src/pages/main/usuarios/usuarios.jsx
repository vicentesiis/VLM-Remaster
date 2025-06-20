import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import React, { useState } from "react"
import GroupResponsible from "./components/group-responsible"
import { useUsuariosData } from "./hooks/useUsuariosData"
import UsuarioDialog from "@/components/customs/dialogs/usuario-dialog"
import { groupConfig } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { getUsuarioColumns } from "@/components/customs/table/columns/usuarioColumns"
import { DataTable } from "@/components/data-table"
import { Card, CardContent } from "@/components/ui"
import GroupDialog from "@/components/customs/dialogs/group-dialog"

const Usuarios = () => {
  const {
    isAdmin,
    isSuperAdmin,
    isAgent,
    groupName,
    values,
    onChange,
    handleSearch,
    listOfGroups,
    shouldFetch,
    members,
    admin,
    leader,
    isLoading,
    isError,
  } = useUsuariosData()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)

  const handleEdit = (user) => {
    setUserToEdit(user)
    setIsDialogOpen(true)
  }

  const columns = getUsuarioColumns(handleEdit, isAgent)
  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const title = isSuperAdmin
    ? "Usuarios por Grupo"
    : isAdmin
      ? "Usuarios"
      : isAgent
        ? "Usuarios"
        : "Usuarios"

  return (
    <PageLayout title={title}>
      {(isAdmin || isSuperAdmin) && (
        <div className="absolute right-0 top-2 z-10">
          <UsuarioDialog />
        </div>
      )}
      {isSuperAdmin && (
        <div className="absolute right-40 top-2 z-10">
          <GroupDialog />
        </div>
      )}

      <Card>
        <CardContent>
          <SectionHeader
            title="Informacion del Grupo:"
            extra={groupName}
            className="pb-6"
            actions={
              isSuperAdmin && (
                <FilterToolbar
                  filterConfig={[groupConfig]}
                  values={values}
                  onChange={onChange}
                  context={{ groups: listOfGroups }}
                  onSearch={handleSearch}
                />
              )
            }
          />

          {shouldFetch ? (
            <WithStatusState isLoading={isLoading} isError={isError}>
              <div className="flex gap-4">
                <GroupResponsible admin={admin} leader={leader} />
                <DataTable
                  table={table}
                  isLoading={isLoading}
                  isError={isError}
                  hasFetched={true}
                  showPagination={false}
                />
              </div>
            </WithStatusState>
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
