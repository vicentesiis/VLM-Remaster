import React from "react"
import { toast } from "sonner"
import { group } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { Card, CardContent } from "@/components/ui"
import { useCodexData } from "@/hooks/queries"
import { useFiltersState } from "@/hooks/useFiltersState"
import { useUserPermissions } from "@/hooks/useUserPermissions"
import { extractAndMapToOptions } from "@/utils"
import { useUserTable } from "./hooks/useUserTable"
import { DataTable } from "@/components/data-table"

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
  const { table, isLoading, isError } = useUserTable()

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
          <DataTable
            table={table}
            isLoading={isLoading}
            isError={isError}
            hasFetched={true}
            showPagination={false}
          ></DataTable>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Usuarios
