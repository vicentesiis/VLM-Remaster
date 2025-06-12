import React from "react"
import { DefaultCell } from "../../table/cells"
import StatusBadge from "../../badge/status-badge"

export const ventasPorAgenteRender = {
  status: ({ item }) => <StatusBadge title={item.status || "N/A"} />,
  quantity: ({ item }) => (
    <DefaultCell title={item.quantity || "N/A"} align="center" />
  ),
  total: ({ item }) => (
    <DefaultCell title={item.total || "N/A"} align="center" />
  ),
}
export default ventasPorAgenteRender
