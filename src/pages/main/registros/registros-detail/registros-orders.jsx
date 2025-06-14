import PropTypes from "prop-types"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"

export const RegistrosOrders = ({ registro }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Órdenes</CardTitle>
      </CardHeader>
      <CardContent>
        Future Table
      </CardContent>
    </Card>
  )
}

RegistrosOrders.propTypes = {
  registro: PropTypes.any,
}

export default RegistrosOrders
