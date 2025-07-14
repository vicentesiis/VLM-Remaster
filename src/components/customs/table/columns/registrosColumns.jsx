import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import StatusBadge from "../../badge/status-badge"
import NullableCell from "../cells/nullable-cell"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { Badge } from "@/components/ui"
import { Roles } from "@/constants"
import { formatDate } from "@/utils"

const columnHelper = createColumnHelper()

// Main Columns
const nameColumn = columnHelper.accessor("name", {
  header: "Nombre",
  cell: (info) => (
    <MainCell
      title={info.getValue()}
      public_id={info.row.original.public_id}
      path="/detalle"
    />
  ),
})

const statusColumn = columnHelper.accessor("status", {
  header: "Estatus",
  cell: (info) => <StatusBadge status={info.getValue()} />,
  meta: {
    align: "center",
    variant: "multiSelect",
    label: "Estatus",
    options: [],
    maxWidth: "100px",
  },
})

const updatedAtColumn = columnHelper.accessor("updated_at", {
  header: "Última Actualización",
  cell: (info) => (
    <NullableCell value={formatDate(info.getValue())} className="text-center" />
  ),
  meta: {
    align: "center",
    variant: "dateRange",
    label: "Rango de fechas",
  },
})

const getAssignmentAtColumn = (title) =>
  columnHelper.accessor("assignment_date", {
    header: "Fecha de Asignación",
    cell: (info) => {
      const assignmentDate = info.getValue()

      if (!assignmentDate) {
        return <NullableCell className="text-center" />
      }

      const date = new Date(assignmentDate)
      const now = new Date()
      const hoursDiff =
        Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)

      let variant = "neutral"
      let label = formatDate(assignmentDate)

      if (title === "Leads") {
        if (hoursDiff <= 12) {
          variant = "success"
        } else if (hoursDiff <= 24) {
          variant = "warning"
        } else {
          variant = "error"
        }

        return (
          <Badge variant={variant} className="w-full justify-center">
            {label}
          </Badge>
        )
      }
      return <NullableCell value={label} className="text-center" />
    },
    meta: {
      align: "center",
    },
  })

// Admin-Only Columns
const recordTypeColumn = columnHelper.accessor("record_type", {
  header: "Tipo",
  cell: (info) => (
    <NullableCell value={info.getValue()} className="text-center" />
  ),
  meta: {
    align: "center",
    variant: "select",
    label: "Tipo",
    options: [],
  },
})

const channelColumn = columnHelper.accessor("channel", {
  header: "Canal",
  cell: (info) => (
    <NullableCell value={info.getValue()} className="text-center" />
  ),
  meta: {
    align: "center",
    variant: "multiSelect",
    label: "Canal",
    options: [],
  },
})

const programColumn = columnHelper.accessor("program", {
  header: "Programa",
  cell: (info) => (
    <NullableCell value={info.getValue()} className="text-center" />
  ),
  meta: {
    align: "center",
    variant: "multiSelect",
    label: "Programa",
    options: [],
  },
})

const phoneColumn = columnHelper.accessor("phone", {
  header: "Teléfono",
  cell: (info) => <NullableCell value={info.getValue()} />,
  meta: {
    align: "center",
  },
})

// Shared Columns
const commentsColumn = columnHelper.accessor("comments", {
  header: "Comentarios",
  cell: (info) => (
    <NullableCell
      value={info.getValue()}
      className="line-clamp-2 max-w-xs break-words"
    />
  ),
  meta: {
    align: "center",
  },
})

// Optional Group Filter
const groupFilterColumn = columnHelper.accessor("group_id", {
  header: "Grupo",
  cell: () => null,
  meta: {
    align: "center",
    variant: "select",
    label: "Grupo",
    options: [],
    isVirtual: true,
  },
  enableColumnFilter: true,
})

export const getRegistrosColumns = ({
  role,
  groups = [],
  channels = [],
  programs = [],
  recordStatuses = [],
  recordTypes = [],
  title = "",
}) => {
  const isAdmin = role === Roles.ADMIN
  const isSuperAdmin = role === Roles.SUPER_ADMIN
  const isAgent = role === Roles.AGENT

  // Inject dynamic options
  statusColumn.meta.options = recordStatuses
  recordTypeColumn.meta.options = recordTypes
  channelColumn.meta.options = channels
  programColumn.meta.options = programs
  groupFilterColumn.meta.options = groups

  const baseColumns = [
    nameColumn,
    statusColumn,
    updatedAtColumn,
    getAssignmentAtColumn(title),
  ]

  if (isSuperAdmin) {
    return [
      groupFilterColumn,
      ...baseColumns,
      recordTypeColumn,
      channelColumn,
      programColumn,
      commentsColumn,
    ]
  }

  if (isAdmin) {
    return [
      ...baseColumns,
      recordTypeColumn,
      channelColumn,
      programColumn,
      commentsColumn,
    ]
  }

  if (isAgent) {
    return [...baseColumns, programColumn, phoneColumn, commentsColumn]
  }

  return [...baseColumns, commentsColumn]
}
