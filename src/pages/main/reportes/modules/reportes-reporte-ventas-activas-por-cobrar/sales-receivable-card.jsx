import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import PropTypes from "prop-types"
import React from "react"
import SectionHeader from "@/components/customs/section-header"
import { salesReceivableColumns } from "@/components/customs/table/columns/salesReceivableColumns"
import { DataTable } from "@/components/data-table"
import { Card, CardContent } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatCurrency } from "@/utils"

export const SalesReceivableCard = ({
  username,
  total_to_be_collected,
  records,
}) => {
  const { isLeader, isAdmin, isSuperAdmin } = useCurrentUser()

  const table = useReactTable({
    data: records,
    columns: salesReceivableColumns(),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card>
      <CardContent>
        <SectionHeader
          title={
            isLeader || isAdmin || isSuperAdmin
              ? `Total de ${username}:`
              : "Total a cobrar:"
          }
          extra={formatCurrency(total_to_be_collected)}
        />
        <DataTable table={table} hasFetched showPagination={false} />
      </CardContent>
    </Card>
  )
}

SalesReceivableCard.propTypes = {
  records: PropTypes.any,
  total_to_be_collected: PropTypes.any,
  username: PropTypes.any,
}

export default SalesReceivableCard
