import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import DateCell from "../../table-data/table-body/table-cell/date-cell"
import { MainCell } from "../../table-data/table-body/table-cell"
import { StatusBadgeCell } from "../../table-data/table-body/table-cell"

const columnHelper = createColumnHelper()

export const registrosColumns = [
  columnHelper.accessor("public_id", {
    header: "ID",
  }),

  columnHelper.accessor("name", {
    header: "Nombre",
    cell: (info) => (
      <MainCell
        title={info.getValue()}
        public_id={info.row.original.public_id}
        path="/detalle"
      />
    ),
  }),

  columnHelper.accessor("email", {
    header: "Correo",
  }),

  columnHelper.accessor("phone", {
    header: "Teléfono",
  }),

  columnHelper.accessor("nationality", {
    header: "Nacionalidad",
  }),

  columnHelper.accessor("state", {
    header: "Estado",
  }),

  columnHelper.accessor("record_type", {
    header: "Tipo",
  }),

  columnHelper.accessor("channel", {
    header: "Canal",
  }),

  columnHelper.accessor("status", {
    header: "Estatus",
    cell: (info) => <StatusBadgeCell title={info.getValue()} />,
  }),

  columnHelper.accessor("program", {
    header: "Programa",
  }),

  columnHelper.accessor("created_at", {
    header: "Fecha de creación",
    cell: (info) => <DateCell value={info.getValue()} />,
  }),
]
