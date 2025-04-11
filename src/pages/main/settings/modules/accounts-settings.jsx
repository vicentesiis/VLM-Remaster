import { PlusIcon } from "lucide-react"
import React from "react"
import AccountsSettingsCard from "@/components/customs/account-settings-card"
import CardHeaderSection from "@/components/customs/card-header-section"
import PageLayout from "@/components/customs/layout/page-layout"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import accontSettingsData from "@/data/account-settings-data"

export const AccountsSettings = () => {
  const Actions = () => {
    return (
      <>
        <Button>
          <PlusIcon />
          Agregar Cuenta
        </Button>
      </>
    )
  }

  return (
    <PageLayout title={"Configuración de Cuentas"}>
      <Card>
        <CardHeaderSection title="Cuentas de Deposito" actions={<Actions />} />
        <CardContent>
          <AccountsSettingsCard accounts={accontSettingsData} />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default AccountsSettings
