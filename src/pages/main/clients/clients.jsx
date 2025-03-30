import React from "react"
import PageLayout from "@/components/customs/page-layout"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const Clients = () => {
  return (
    <PageLayout title="Clientes">
      <Card className="mx-auto max-w-screen-xl px-4">
        <CardHeader>
          <CardTitle>Cliente</CardTitle>
        </CardHeader>
      </Card>
    </PageLayout>
  )
}

export default Clients
