import React from "react"
import { DefaultCell } from "../../table/cells"
import { MainCell } from "../../table/cells"
import { StatusBadgeCell } from "../../table/cells"
import { toTitleCase } from "@/utils/utils"

export const registrosRender = {
  id: ({ item }) => (
    <MainCell
      path="/clientes"
      title={item.name || "N/A"}
      public_id={item.public_id?.toUpperCase()}
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
}
