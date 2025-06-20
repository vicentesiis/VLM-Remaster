import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import StatusBadge from "../../badge/status-badge"
import ActionDropdown from "@/components/customs/action-dropdown"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatDate } from "@/lib/format"
import { Roles } from "@/constants"

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
  cell: (info) => formatDate(info.getValue()),
  meta: {
    align: "center",
    variant: "dateRange",
    label: "Rango de fechas",
  },
})

// Admin-Only Columns
const recordTypeColumn = columnHelper.accessor("record_type", {
  header: "Tipo",
  meta: {
    align: "center",
    variant: "select",
    label: "Tipo",
    options: [],
  },
})

const channelColumn = columnHelper.accessor("channel", {
  header: "Canal",
  meta: {
    align: "center",
    variant: "multiSelect",
    label: "Canal",
    options: [],
  },
})

const programColumn = columnHelper.accessor("program", {
  header: "Programa",
  meta: {
    align: "center",
    variant: "multiSelect",
    label: "Programa",
    options: [],
  },
})

// Agent-Only Columns
const emailColumn = columnHelper.accessor("email", {
  header: "Correo",
})

const phoneColumn = columnHelper.accessor("phone", {
  header: "Teléfono",
})

const vacantColumn = columnHelper.accessor("job", {
  header: "ID de la Vacante",
})

// Shared Columns
const commentsColumn = columnHelper.accessor("comments", {
  header: "Comentarios",
  cell: (info) => (
    <div className="line-clamp-2 max-w-xs break-words text-muted-foreground">
      {info.getValue() ?? "---"}
    </div>
  ),
  meta: {
    align: "center",
  },
})

const actionsColumn = columnHelper.display({
  id: "actions",
  header: "",
  cell: ({ row }) => (
    <ActionDropdown
      sections={[
        {
          title: "Cliente",
          options: [
            {
              title: "Detalle del Cliente",
              onSelect: () =>
                alert(`Detalle del Cliente: ${row.original.name}`),
            },
            {
              title: "Órdenes del Cliente",
              onSelect: () =>
                alert(`Órdenes del Cliente: ${row.original.name}`),
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
  meta: {
    align: "center",
    maxWidth: "60px",
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

  const baseColumns = [nameColumn, statusColumn, updatedAtColumn]

  if (isSuperAdmin) {
    return [
      groupFilterColumn,
      ...baseColumns,
      recordTypeColumn,
      channelColumn,
      programColumn,
      commentsColumn,
      actionsColumn,
    ]
  }

  if (isAdmin) {
    return [
      ...baseColumns,
      recordTypeColumn,
      channelColumn,
      programColumn,
      commentsColumn,
      actionsColumn,
    ]
  }

  if (isAgent) {
    return [
      ...baseColumns,
      vacantColumn,
      emailColumn,
      phoneColumn,
      commentsColumn,
      actionsColumn,
    ]
  }

  return [...baseColumns, commentsColumn, actionsColumn]
}
