import React from "react"
import { DefaultCell } from "../../table/cells"
import { StatusBadgeCell } from "../../table/cells"

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
