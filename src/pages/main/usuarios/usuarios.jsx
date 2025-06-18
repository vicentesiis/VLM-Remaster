import React from "react"
import { group } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { Card, CardHeader, CardTitle } from "@/components/ui"
import { useCodexData } from "@/hooks/queries"
import { useFiltersState } from "@/hooks/useFiltersState"
import { useUserPermissions } from "@/hooks/useUserPermissions"
import { extractAndMapToOptions } from "@/utils"

export const Usuarios = () => {
  const { role } = useUserPermissions()
  const { groups } = useCodexData(role)
  const listOfGroups = extractAndMapToOptions(groups)

  const { values, onChange } = useFiltersState({
    group: "",
  })

  const handleSearch = () => {
    if (!values.group) {
      toast.error("El Grupo es necesario para el proceso")
    }
  }

  return (
    <PageLayout title={"Usuarios por Grupo"}>
      <Card>
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <FilterToolbar
            filterConfig={[group]}
            values={values}
            onChange={onChange}
            context={{ groups: listOfGroups }}
            onSearch={handleSearch}
          />
        </CardHeader>
      </Card>
    </PageLayout>
  )
}

export default Usuarios
