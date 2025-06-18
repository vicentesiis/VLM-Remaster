import { PlusIcon } from "lucide-react"
import React, { useState } from "react"
import CuentasCard from "@/components/customs/cuentas-card"
import CardHeaderSection from "@/components/customs/card-header-section"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { Button, Card, CardContent } from "@/components/ui"
import accontSettingsData from "@/data/account-settings-data"
import { CuentaForm } from "@/components/customs/forms/cuenta-form"

export const Cuentas = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const Actions = () => {
    return (
      <>
        <Button className="ml-auto" onClick={handleOpen}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Agregar Cuenta
        </Button>
        <CuentaForm open={open} onClose={handleOpen} />
      </>
    )
  }

  return (
    <PageLayout title={"Configuración de Cuentas"}>
      <Card>
        <CardHeaderSection title="Cuentas de Depósito" actions={<Actions />} />
        <CardContent>
          <CuentasCard accounts={accontSettingsData} />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Cuentas
