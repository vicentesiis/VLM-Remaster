import React from "react"
import DateCell from "@/components/customs/table-data/table-body/table-cell/date-cell"
import DefaultCell from "@/components/customs/table-data/table-body/table-cell/default-cell"
import DropdownCell from "@/components/customs/table-data/table-body/table-cell/dropdown-cell"
import MainCell from "@/components/customs/table-data/table-body/table-cell/main-cell"
import StatusBadgeCell from "@/components/customs/table-data/table-body/table-cell/status-badge-cell"

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  )
}

export const registrosRender = {
  id: ({ item }) => (
    <MainCell
      path="/clientes"
      title={item.name || "N/A"}
      public_id={item.public_id?.toUpperCase()}
    />
  ),
  actions: () => (
    <DropdownCell
      sections={[
        {
          title: "Cliente",
          options: [
            {
              title: "Detalle del Cliente",
              onSelect: () => alert("Detalle del Cliente"),
            },
            {
              title: "Ordenes del Cliente",
              onSelect: () => alert("Ordenes del Cliente"),
            },
          ],
        },
        {
          title: "Extras",
          options: [
            {
              title: "Generar Contrato",
              onSelect: () => alert("Generar Contrato"),
            },
          ],
        },
      ]}
    />
  ),
  status: ({ item }) => <StatusBadgeCell title={item.status || "N/A"} />,
  channel: ({ item }) => (
    <DefaultCell title={toTitleCase(item.channel) || "N/A"} align="center" />
  ),
  nationality: ({ item }) => (
    <DefaultCell
      title={toTitleCase(item.nationality) || "N/A"}
      align="center"
    />
  ),
  state: ({ item }) => (
    <DefaultCell title={toTitleCase(item.state) || "N/A"} align="center" />
  ),
  record_type: ({ item }) => (
    <DefaultCell
      title={item.record_type?.toUpperCase() || "N/A"}
      align="center"
    />
  ),
  created_at: ({ item }) => <DateCell value={item.created_at} />,
}
