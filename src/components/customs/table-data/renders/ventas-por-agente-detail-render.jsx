import React from "react"
import { DefaultCell } from "../../table/cells"
import StatusBadge from "../../badge/status-badge"

export const ventasPorAgenteDetailRender = {
  status: ({ item }) => (
    <StatusBadge title={item.status || "N/A"} align="center" />
  ),
  quantity: ({ item }) => (
    <DefaultCell title={item.quantity || "N/A"} align="center" />
  ),
  total: ({ item }) => (
    <DefaultCell title={item.total || "N/A"} align="center" />
  ),
}

export default ventasPorAgenteDetailRender
