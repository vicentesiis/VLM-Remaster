import { Hash, Headset, Briefcase } from "lucide-react"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import IconBadge from "@/components/customs/badge/icon-badge"
import StatusBadge from "@/components/customs/badge/status-badge"
import DownloadDropdown from "@/components/customs/download-dropdown"
import PageLayout from "@/components/customs/page-layout"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import ComboBox from "@/components/ui/combobox"
import { ClientTabs } from "@/pages/main/clients/client-detail/client-tabs"

export const ClientDetail = () => {
  const { clientId } = useParams()
  const [selectedStatus, setSelectedStatus] = useState("")

  const comboBoxStatus = [
    { value: "Creado", label: "Creado" },
    { value: "Importado", label: "Importado" },
    { value: "Aprovado", label: "Aprovado" },
    { value: "Pendiente", label: "Pendiente" },
  ]

  const menuItems = [
    {
      label: "Documentos",
      childs: [
        {
          label: "Comprobante de Registro",
          onClick: () => console.log("Comprobante de Registro clicked"),
        },
      ],
    },
  ]

  return (
    <PageLayout title={`Detalle del Cliente: ${clientId}`}>
      <Card className="mx-auto max-w-screen-xl px-4">
        <CardHeader className="mb-8">
          <div className="flex flex-col justify-between sm:flex-row">
            <div className="mb-2 flex items-center justify-center space-x-2">
              <CardTitle>Lawrence Cannon</CardTitle>
              <StatusBadge status="Corregir Contrato" />
            </div>
            <div className="mb-4 flex justify-end space-x-2 sm:mb-0">
              <ComboBox
                options={comboBoxStatus}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Selecciona un Estatus"
              />
              <DownloadDropdown label="Open Menu" items={menuItems} />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconBadge title={clientId} icon={<Hash />} variant={"primary"} />
            <IconBadge
              title="agentev"
              icon={<Headset />}
              variant={"secondary"}
            />
            <IconBadge title="B" icon={<Briefcase />} variant={"secondary"} />
          </div>
        </CardHeader>
      </Card>
      <ClientTabs />
    </PageLayout>
  )
}
