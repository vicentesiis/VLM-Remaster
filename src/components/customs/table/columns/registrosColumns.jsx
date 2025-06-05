import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { DateCell } from "@/components/customs/table/cells/date-cell"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { StatusBadgeCell } from "@/components/customs/table/cells/status-badge-cell"

const columnHelper = createColumnHelper()

export const registrosColumns = [
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

  columnHelper.accessor("record_type", {
    header: "Tipo",
  }),

  columnHelper.accessor("channel", {
    header: "Canal",
  }),

  columnHelper.accessor("status", {
    header: "Estatus",
    cell: (info) => <StatusBadgeCell title={info.getValue()} />,
    meta: {
      variant: "multiSelect", // tells the toolbar how to render
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

  columnHelper.accessor("program", {
    header: "Programa",
  }),

  columnHelper.accessor("created_at", {
    header: "Fecha de creación",
    cell: (info) => <DateCell value={info.getValue()} />,
    meta: {
      variant: "dateRange",
      label: "Rango de fechas",
    },
  }),
]
