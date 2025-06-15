import PropTypes from "prop-types"
import React from "react"
import { useOrdersTable } from "./hooks/useOrdersTable"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"

export const RegistrosOrders = ({ recordId }) => {
  const { table, isLoading, isError } = useOrdersTable(recordId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Órdenes</CardTitle>
      </CardHeader>
      <CardContent>
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
