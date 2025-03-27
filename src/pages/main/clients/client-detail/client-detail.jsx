import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import PageLayout from "@/components/customs/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Tag from "@/components/ui/tag"
import ComboBox from "@/components/ui/combobox"
import DownloadDropdown from "@/components/customs/download-dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"
import { ClientTabs } from "@/pages/main/clients/client-detail/client-tabs"
import {
  H4,
  P,
  Lead,
  PLead,
  Large,
  Muted,
  Blockquote,
} from "@/components/ui/typography"

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

  const tabs = [
    {
      name: "pnpm",
      value: "pnpm",
      content: "pnpm dlx shadcn@latest add tabs",
    },
    {
      name: "npm",
      value: "npm",
      content: "npx shadcn@latest add tabs",
    },
    {
      name: "yarn",
      value: "yarn",
      content: "npx shadcn@latest add tabs",
    },
    {
      name: "bun",
      value: "bun",
      content: "bunx --bun shadcn@latest add tabs",
    },
  ]

  return (
    <PageLayout title={`Detalle del Cliente: ${clientId}`}>
      <Card className="mx-auto max-w-screen-xl px-4">
        <CardHeader className="mb-8">
          <div className="flex justify-between">
            <div className="flex flex-row items-center space-x-2">
              <CardTitle>{clientId}</CardTitle>
              <Tag label="Contrato Generado" variant="filled" />
            </div>
            <div className="flex space-x-2">
              <ComboBox
                options={comboBoxStatus}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Selecciona un Estatus"
              />
              <DownloadDropdown label="Open Menu" items={menuItems} />
            </div>
          </div>
          <div className="space-x-2">
            <Tag label="Contrato Generado" variant="outline" />
            <Tag label="Pendiente" variant="outline" />
            <Tag label="Pagada" type="payment" variant="outline" />
          </div>
        </CardHeader>
      </Card>
      <ClientTabs />
    </PageLayout>
  )
}
