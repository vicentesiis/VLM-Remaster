import { SearchIcon, UserPlus } from "lucide-react"
import React from "react"
import { InputIcon } from "@/components/customs"
import { CardHeaderSection } from "@/components/customs/card-header-section"
import PageLayout from "@/components/customs/layout/page-layout"
import { BaseTable } from "@/components/customs/table-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { userSettingsTableBody } from "@/data/user-settings-table-data"

export const UserSettings = () => {
  const Actions = () => {
    return (
      <>
        <InputIcon placeholder={"Buscar"} icon={SearchIcon} />
        <Button className="ml-auto">
          <UserPlus />
          Agregar Usuario
        </Button>
      </>
    )
  }

  return (
    <PageLayout title="Administrador de Usuarios">
      <Card>
        <CardHeaderSection title={"Lista de Usuarios"} actions={<Actions />} />
        <CardContent>
          <BaseTable
            data={userSettingsTableBody}
            tableType={"userSettingsTableBody"}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default UserSettings
