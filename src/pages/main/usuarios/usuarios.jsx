import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import React, { useCallback, useMemo, useState } from "react"
import GroupResponsible from "./components/group-responsible"
import { useUsuariosData } from "./hooks/useUsuariosData"
import GroupDialog from "@/components/customs/dialogs/group-dialog"
import UpdateGroupPhoneDialog from "@/components/customs/dialogs/update-phone-dialog"
import UsuarioDialog from "@/components/customs/dialogs/usuario-dialog"
import { groupConfig } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
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
    isError,
    isFetching,
    isFetched,
    selectedGroupId,
    response,
  } = useUsuariosData()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)

  const handleEdit = useCallback((user) => {
    setUserToEdit(user)
    setIsDialogOpen(true)
  }, [])

  const columns = useMemo(
    () => getUsuarioColumns(handleEdit, isAgent),
    [handleEdit, isAgent]
  )

  const tableData = useMemo(() => {
    return isAgent
      ? [leader, ...members].filter(Boolean).filter((user) => user.active)
      : members
  }, [isAgent, leader, members])

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const actions = useMemo(() => (
    <div className="flex flex-col gap-2 sm:flex-row">
      {isSuperAdmin ? (
        <>
          <div className="flex justify-center gap-2">
            <GroupDialog />
            {shouldFetch && <UpdateGroupPhoneDialog group={response?.data} />}
          </div>
          <FilterToolbar
            filterConfig={[groupConfig]}
            values={values}
            onChange={onChange}
            context={{ groups: listOfGroups }}
            onSearch={handleSearch}
            isLoading={isFetching}
          />
        </>
      ) : (
        <UsuarioDialog />
      )}
    </div>
  ), [isSuperAdmin, shouldFetch, response?.data, values, onChange, listOfGroups, handleSearch, isFetching])

  const title = useMemo(() => (isSuperAdmin ? "Usuarios por Grupo" : "Usuarios"), [isSuperAdmin])
  return (
    <PageLayout title={title} subtitle={groupName}>
      <Card>
        <CardContent>
          {(isAdmin || isSuperAdmin) && (
            <SectionHeader actions={actions} />
          )}

          <div className="flex flex-col gap-4 sm:flex-row">
            {!isAgent && (
              <GroupResponsible
                admin={admin}
                leader={leader}
                group={selectedGroupId}
                isLoading={isFetching && !isFetched}
              />
            )}

            <DataTable
              table={table}
              isLoading={shouldFetch ? isFetching && !isFetched : false}
              isError={shouldFetch ? isError : false}
              hasFetched={shouldFetch ? isFetched : false}
              showPagination={false}
            />
          </div>
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
