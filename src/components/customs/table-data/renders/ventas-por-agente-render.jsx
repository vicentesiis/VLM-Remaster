import React from "react"
import DefaultCell from "@/components/customs/table-data/table-body/table-cell/default-cell"
import StatusBadgeCell from "@/components/customs/table-data/table-body/table-cell/status-badge-cell"

export const ventasPorAgenteRender = {
  status: ({ item }) => <StatusBadgeCell title={item.status || "N/A"} />,
  quantity: ({ item }) => (
    <DefaultCell title={item.quantity || "N/A"} align="center" />
  ),
  total: ({ item }) => (
    <DefaultCell title={item.total || "N/A"} align="center" />
  )
}
export default ventasPorAgenteRender
