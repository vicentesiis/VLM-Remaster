import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { StatusBadgeCell } from "@/components/customs/table/cells/status-badge-cell"

const columnHelper = createColumnHelper()

const formatDate = (isoString) => {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const getRegistrosColumns = (role, title) => {
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
          { label: "Creado", value: "created" },
          { label: "Asignado", value: "assigned" },
          { label: "Pendiente Info", value: "pending_info" },
          { label: "Generar Trabajos", value: "generate_jobs" },
          { label: "Trabajos Generados", value: "jobs_generated" },
          { label: "Regenerar Trabajos", value: "regenerate_jobs" },
          { label: "Generar Contrato", value: "generate_contract" },
          { label: "Contrato Generado", value: "contract_generated" },
          { label: "Corregir Contrato", value: "fix_contract" },
          { label: "Pendiente Aprobación", value: "pending_approval" },
          { label: "Aprobado", value: "approved" },
          { label: "Seleccionar Fecha", value: "selecting_leave_date" },
          { label: "Fecha Seleccionada", value: "leave_date_selected" },
          { label: "Fecha Confirmada", value: "leave_date_confirmed" },
          { label: "Finalizado", value: "finalized" },
          { label: "Inactivo", value: "inactive" },
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
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("program", {
      header: "Programa",
      meta: {
        align: "center",
      },
    }),
  ]

  const generalEndcolumns = [
    columnHelper.accessor("comments", {
      header: "Comentarios",
      cell: (info) => info.getValue() ?? "...",
      meta: {
        align: "center",
        // className: "text-red-600",
        // headerClassName: "text-center font-semibold text-red-600",
      },
    }),
  ]

  const isAdmin = role === "admin" || role === "super_admin"
  // const isMyRecords = title.toLowerCase().startsWith("mis")

  if (isAdmin) {
    return [...baseColumns, ...adminColumns, ...generalEndcolumns]
  }

  if (role === "agent") {
    return [...baseColumns, ...agentColumns, ...generalEndcolumns]
  }

  return [...baseColumns, ...adminColumns, ...generalEndcolumns]
}
