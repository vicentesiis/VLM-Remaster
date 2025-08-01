import PropTypes from "prop-types"
import React from "react"
import { useOrdersTable } from "./hooks/useOrdersTable"
import OrderDialog from "@/components/customs/dialogs/order-dialog"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardTitle } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export const RegistrosOrders = ({ registro }) => {
  const { id: recordId, user } = registro
  const { id: currentUserId, isAgent } = useCurrentUser()
  const canCreateOrder = isAgent && currentUserId === user.id

  const { table, isLoading, isError } = useOrdersTable(recordId, canCreateOrder)

  return (
    <Card>
      <CardContent>
        <div className="mt-4 flex justify-between sm:mt-0">
          <CardTitle className="mb-4">Lista de Órdenes</CardTitle>
          {canCreateOrder && <OrderDialog recordId={recordId} />}
        </div>
        <DataTable
          table={table}
          isLoading={isLoading}
          isError={isError}
          hasFetched={true}
          showPagination={false}
        />
      </CardContent>
    </Card>
  )
}

RegistrosOrders.propTypes = {
  registro: PropTypes.any,
}

export default RegistrosOrders
