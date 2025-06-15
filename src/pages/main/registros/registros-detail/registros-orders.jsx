import PropTypes from "prop-types"
import React from "react"
import { useOrdersTable } from "./hooks/useOrdersTable"
import OrderDialog from "@/components/customs/dialogs/order-dialog"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardTitle } from "@/components/ui"

export const RegistrosOrders = ({ recordId }) => {
  const { table, isLoading, isError } = useOrdersTable(recordId)

  return (
    <Card>
      <CardContent>
        <CardTitle className="mb-4">Lista de Órdenes</CardTitle>
        <OrderDialog />
        <DataTable
          table={table}
          isLoading={isLoading}
          isError={isError}
          hasFetched={true}
          showPagination={false}
        ></DataTable>
      </CardContent>
    </Card>
  )
}

RegistrosOrders.propTypes = {
  recordId: PropTypes.any,
}

export default RegistrosOrders
