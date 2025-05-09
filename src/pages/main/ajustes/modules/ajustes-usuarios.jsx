import React, { useState } from "react"
import { SearchIcon, UserPlus } from "lucide-react"
import { InputIcon } from "@/components/customs"
import { CardHeaderSection } from "@/components/customs/card-header-section"
import PageLayout from "@/components/customs/layout/page-layout"
import { BaseTable } from "@/components/customs/table-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { userSettingsTableBody } from "@/data/user-settings-table-data"
import { UserForm } from "@/components/customs/client-detail/user-create-form"

export const AjustesUsuarios = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const Actions = () => {
    return (
      <>
        <InputIcon placeholder="Buscar" icon={SearchIcon} />
        <Button className="ml-auto" onClick={handleOpen}>
          <UserPlus className="mr-2 h-4 w-4" />
          Agregar Usuario
        </Button>
        <UserForm open={open} onClose={handleOpen} />
      </>
    )
  }

  return (
    <PageLayout title="Administrador de Usuarios">
      <Card>
        <CardHeaderSection title="Lista de Usuarios" actions={<Actions />} />
        <CardContent>
          <BaseTable
            data={userSettingsTableBody}
            tableType="userSettingsTableBody"
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default AjustesUsuarios
