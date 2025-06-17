import { SearchIcon, UserPlus } from "lucide-react"
import React, { useState } from "react"
import { InputIcon } from "@/components/customs"
import { CardHeaderSection } from "@/components/customs/card-header-section"
import { UsuarioForm } from "@/components/customs/forms/usuario-form"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { userSettingsTableBody } from "@/data/user-settings-table-data"

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
        <UsuarioForm open={open} onClose={handleOpen} />
      </>
    )
  }

  return (
    <PageLayout title="Administrador de Usuarios">
      <Card>
        <CardHeaderSection title="Lista de Usuarios" actions={<Actions />} />
        <CardContent>
          asdfasdfasd
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default AjustesUsuarios
