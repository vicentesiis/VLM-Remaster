import React from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import PageLayout from "@/components/customs/page-layout"

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
