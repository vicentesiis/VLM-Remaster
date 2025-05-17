import { Hash, Headset, Briefcase } from "lucide-react"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import IconBadge from "@/components/customs/badge/icon-badge"
import StatusBadge from "@/components/customs/badge/status-badge"
import DownloadDropdown from "@/components/customs/download-dropdown"
import PageLayout from "@/components/customs/layout/page-layout"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import ComboBox from "@/components/ui/combobox"
import { ClientesTab } from "@/pages/main/clientes/clientes-detail/clientes-tabs"

export const ClientesDetail = () => {
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
      <Card className="pb-6">
        <CardHeader >
          <div className="flex flex-col sm:flex-row sm:justify-between">
            {/* Title + Status */}
            <div className="mb-2 items-center sm:flex sm:justify-center sm:space-x-2">
              <CardTitle className="text-primary">Lawrence Cannon</CardTitle>
              <StatusBadge status="Corregir Contrato" />
            </div>
            {/* ComboBox + Download Dropdown */}
            <div className="mb-4 flex justify-between space-x-2 sm:mb-0 sm:justify-end">
              <ComboBox
                options={comboBoxStatus}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Actualizar Estatus"
              />
              <DownloadDropdown label="Open Menu" items={menuItems} />
            </div>
          </div>
          {/* Icon Badges */}
          <div className="flex flex-wrap gap-2">
            <IconBadge
              title={clientId}
              icon={<Hash />}
              variant={"iconBadgePrimary"}
            />
            <IconBadge
              title="agentev"
              icon={<Headset />}
              variant={"iconBadgeSecondary"}
            />
            <IconBadge
              title="B"
              icon={<Briefcase />}
              variant={"iconBadgeSecondary"}
            />
          </div>
        </CardHeader>
      </Card>
      <ClientesTab />
    </PageLayout>
  )
}

export default ClientesDetail
