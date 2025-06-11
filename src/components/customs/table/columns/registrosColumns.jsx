import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import ActionDropdown from "@/components/customs/action-dropdown"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { StatusBadgeCell } from "@/components/customs/table/cells/status-badge-cell"
import { Roles } from "@/constants/appConstants"
import { formatDate } from "@/lib/format"

const columnHelper = createColumnHelper()

export const getRegistrosColumns = ({
  role,
  groups = [],
  channels = [],
  programs = [],
  recordStatuses = [],
  recordTypes = [],
}) => {
  const isAdmin = role === Roles.ADMIN || role === Roles.SUPER_ADMIN

  const baseColumns = [
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

    columnHelper.accessor("status", {
      header: "Estatus",
      cell: (info) => <StatusBadgeCell title={info.getValue()} />,
      meta: {
        align: "center",
        variant: "multiSelect",
        label: "Estatus",
        options: recordStatuses,
      },
    }),

    columnHelper.accessor("updated_at", {
      header: "Última Actualización",
      cell: (info) => formatDate(info.getValue()),
      meta: {
        align: "center",
        variant: "dateRange",
        label: "Rango de fechas",
      },
    }),
  ]

  const agentColumns = [
    columnHelper.accessor("email", { header: "Correo" }),
    columnHelper.accessor("phone", { header: "Teléfono" }),
  ]

  const adminColumns = [
    columnHelper.accessor("record_type", {
      header: "Tipo",
      meta: {
        align: "center",
        variant: "select",
        label: "Tipo",
        options: recordTypes,
      },
    }),
    columnHelper.accessor("channel", {
      header: "Canal",
      meta: {
        align: "center",
        variant: "multiSelect",
        label: "Canal",
        options: channels,
      },
    }),
    columnHelper.accessor("program", {
      header: "Programa",
      meta: {
        align: "center",
        variant: "multiSelect",
        label: "Programa",
        options: programs,
      },
    }),
  ]

  const commentsColumn = [
    columnHelper.accessor("comments", {
      header: "Comentarios",
      cell: (info) => info.getValue() ?? "---",
      meta: {
        align: "center",
        className: "text-muted-foreground",
      },
    }),
  ]

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

  const groupFilterColumn = columnHelper.accessor("group_id", {
    header: "Grupo",
    cell: () => null,
    meta: {
      align: "center",
      variant: "select",
      label: "Grupo",
      options: groups,
      isVirtual: true,
    },
    enableColumnFilter: true,
  })

  if (isAdmin) {
    return [
      groupFilterColumn,
      ...baseColumns,
      ...adminColumns,
      ...commentsColumn,
      actionsColumn,
    ]
  }

  if (role === Roles.AGENT) {
    return [...baseColumns, ...agentColumns, ...commentsColumn, actionsColumn]
  }

  return [...baseColumns, ...adminColumns, ...commentsColumn, actionsColumn]
}
