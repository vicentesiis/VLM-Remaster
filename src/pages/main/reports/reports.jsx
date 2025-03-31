import React from "react"
import PageLayout from "@/components/customs/page-layout"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const Reports = () => {
  return (
    <PageLayout title="Reportes">
      <Card className="mx-auto max-w-screen-xl px-4">
        <CardHeader>
          <CardTitle>Que haces aqui?</CardTitle>
        </CardHeader>
      </Card>
    </PageLayout>
  )
}

export default Reports
