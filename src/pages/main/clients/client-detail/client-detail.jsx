import React from "react"
import { useParams } from "react-router-dom"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

export const ClientDetail = () => {
  const { clientId } = useParams() // Get clientId from the URL

  return (
    <Card className="mx-auto max-w-screen-xl px-4">
      <CardHeader>
      <CardTitle>Detalle del Cliente: </CardTitle>
        {/* <CardTitle>Detalle del Cliente: {clientId}</CardTitle> */}
      </CardHeader>
      <CardContent>
        {/* Render client details based on clientId */}
        {/* <p>Client details for {clientId}</p> */}
      </CardContent>
    </Card>
  )
}

export default ClientDetail
