import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import ActionDropdown from "@/components/customs/action-dropdown"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { StatusBadgeCell } from "@/components/customs/table/cells/status-badge-cell"
import { Roles, Statuses } from "@/constants/appConstants"

const columnHelper = createColumnHelper()

const formatDate = (isoString) => {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const getRegistrosColumns = (role) => {
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
        options: [
          { label: "Creado", value: Statuses.CREATED },
          { label: "Asignado", value: Statuses.ASSIGNED },
          { label: "Pendiente Info", value: Statuses.PENDING_INFO },
          { label: "Generar Trabajos", value: Statuses.GENERATE_JOBS },
          { label: "Trabajos Generados", value: Statuses.JOBS_GENERATED },
          { label: "Regenerar Trabajos", value: Statuses.REGENERATE_JOBS },
          { label: "Generar Contrato", value: Statuses.GENERATE_CONTRACT },
          { label: "Contrato Generado", value: Statuses.CONTRACT_GENERATED },
          { label: "Corregir Contrato", value: Statuses.FIX_CONTRACT },
          { label: "Pendiente Aprobación", value: Statuses.PENDING_APPROVAL },
          { label: "Aprobado", value: Statuses.APPROVED },
          { label: "Seleccionar Fecha", value: Statuses.SELECTING_LEAVE_DATE },
          { label: "Fecha Seleccionada", value: Statuses.LEAVE_DATE_SELECTED },
          { label: "Fecha Confirmada", value: Statuses.LEAVE_DATE_CONFIRMED },
          { label: "Finalizado", value: Statuses.FINALIZED },
          { label: "Inactivo", value: Statuses.INACTIVE },
        ],
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
    // columnHelper.accessor("email", { header: "Correo" }),
    columnHelper.accessor("record_type", {
      header: "Tipo",
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("channel", {
      header: "Canal",
      // meta: {
      //   align: "center",
      // },
      meta: {
        align: "center",
        variant: "multiSelect",
        label: "Canal",
        options: [],
      },
    }),
    columnHelper.accessor("program", {
      header: "Programa",
      meta: {
        align: "center",
        variant: "multiSelect",
        label: "Programa",
        options: [],
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
        // className: "text-red-600",
        // headerClassName: "text-center font-semibold text-red-600",
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

  const isAdmin = role === Roles.ADMIN || role === Roles.SUPER_ADMIN
  // const isMyRecords = title.toLowerCase().startsWith("mis")

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

  if (isAdmin) {
    return [
      groupFilterColumn,
      ...baseColumns,
      ...adminColumns,
      ...commentsColumn,
      actionsColumn,
    ]
  }

  if (role === "agent") {
    return [...baseColumns, ...agentColumns, ...commentsColumn, actionsColumn]
  }

  return [...baseColumns, ...adminColumns, ...commentsColumn, actionsColumn]
}
