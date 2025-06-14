import PropTypes from "prop-types"
import React from "react"
import { Card, CardTitle } from "@/components/ui"

export const RegistrosOrders = ({ registro }) => {
  return (
    <Card>
      <CardTitle>Ordenes</CardTitle>
    </Card>
  )
}

RegistrosOrders.propTypes = {
  registro: PropTypes.any.isRequired,
}

export default RegistrosOrders
