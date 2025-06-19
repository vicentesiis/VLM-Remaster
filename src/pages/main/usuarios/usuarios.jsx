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

  const columns = getUsuarioColumns(handleEdit)
  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const title = isSuperAdmin
    ? "Usuarios por Grupo"
    : isAdmin
      ? "Usuarios de tu Grupo"
      : isAgent
        ? "Información de tu Grupo"
        : "Usuarios"

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
            title={`${groupName}`}
            actions={
              isSuperAdmin &&
              listOfGroups.length > 0 && (
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
