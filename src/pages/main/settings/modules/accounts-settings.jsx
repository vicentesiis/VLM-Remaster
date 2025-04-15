import { PlusIcon } from "lucide-react"
import React, { useState } from "react"
import AccountsSettingsCard from "@/components/customs/account-settings-card"
import CardHeaderSection from "@/components/customs/card-header-section"
import PageLayout from "@/components/customs/layout/page-layout"
import { Button, Card, CardContent } from "@/components/ui"
import accontSettingsData from "@/data/account-settings-data"
import { AccountForm } from "@/components/customs/client-detail/account-create-form"

export const AccountsSettings = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const Actions = () => {
    return (
      <>
        <Button className="ml-auto" onClick={handleOpen}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Agregar Cuenta
        </Button>
        <AccountForm open={open} onClose={handleOpen} />
      </>
    )
  }

  return (
    <PageLayout title={"Configuración de Cuentas"}>
      <Card>
        <CardHeaderSection title="Cuentas de Depósito" actions={<Actions />} />
        <CardContent>
          <AccountsSettingsCard accounts={accontSettingsData} />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default AccountsSettings
