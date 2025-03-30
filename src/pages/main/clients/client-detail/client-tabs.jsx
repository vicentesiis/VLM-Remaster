import { User, Edit, List } from "lucide-react" // Import icons from lucide-react
import React from "react"
import ClientForm from "@/components/customs/client-detail/client-form"
import ClientDetailTab from "@/components/customs/client-detail/tabs/client-detail-tab"
import ClientOrdersTab from "@/components/customs/client-detail/tabs/client-orders-tab"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import clientDetailData from "@/data/client-detail-data"

export function ClientTabs() {
  return (
    <Tabs defaultValue="detalle" className="-mt-9">
      <TabsList className="justify-start border-b bg-transparent p-0 pl-6">
        <TabsTrigger
          className="h-full rounded-none border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:shadow-none"
          value="detalle"
        >
          <User className="mr-2" /> Detalle
        </TabsTrigger>
        <TabsTrigger
          className="h-full rounded-none border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:shadow-none"
          value="edit"
        >
          <Edit className="mr-2" /> Editar
        </TabsTrigger>
        <TabsTrigger
          className="h-full rounded-none border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:shadow-none"
          value="orders"
        >
          <List className="mr-2" /> Órdenes
        </TabsTrigger>
      </TabsList>

      {/* Tab Content 1: Detalle */}
      <TabsContent value="detalle">
        <Card className="p-8">
          <ClientDetailTab sections={clientDetailData} />
        </Card>
      </TabsContent>

      {/* Tab Content 2: Editar */}
      <TabsContent value="edit">
        <Card className="p-8">
          <ClientForm />
        </Card>
      </TabsContent>

      {/* Tab Content 3: Órdenes */}
      <TabsContent value="orders">
        <Card className="p-8">
          <ClientOrdersTab />
        </Card>
      </TabsContent>
    </Tabs>
  )
}
