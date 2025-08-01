import { User, Edit, List } from "lucide-react"
import React from "react"
import RegistroForm from "@/components/customs/forms/registro-form"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import ClientesDetailData from "@/data/client-detail-data"
import RegistrosDetailTab from "@/pages/main/registros/registros-detail/tabs/registros-detail-tab"
import RegistrosOrdersTab from "@/pages/main/registros/registros-detail/tabs/registros-orders-tab"

export function RegistroTabs() {
  return (
    <Tabs defaultValue="detalle" className="-mt-9">
      <TabsList className="justify-start border-b bg-transparent p-0 pl-6">
        <TabsTrigger
          className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          value="detalle"
        >
          <User className="mr-2" /> Detalle
        </TabsTrigger>
        <TabsTrigger
          className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          value="edit"
        >
          <Edit className="mr-2" /> Editar
        </TabsTrigger>
        <TabsTrigger
          className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          value="orders"
        >
          <List className="mr-2" /> Órdenes
        </TabsTrigger>
      </TabsList>

      {/* Tab Content 1: Detalle */}
      <TabsContent value="detalle">
        <Card className="p-8 pb-28 sm:p-8">
          <RegistrosDetailTab sections={ClientesDetailData} />
        </Card>
      </TabsContent>

      {/* Tab Content 2: Editar */}
      <TabsContent value="edit">
        <Card className="p-8 pb-28 sm:p-8">
          <RegistroForm />
        </Card>
      </TabsContent>

      {/* Tab Content 3: Órdenes */}
      <TabsContent value="orders">
        <Card className="p-8 pb-24 sm:p-8">
          <RegistrosOrdersTab />
        </Card>
      </TabsContent>
    </Tabs>
  )
}
