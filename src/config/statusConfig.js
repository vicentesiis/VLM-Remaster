// Configurations
export const statusLabels = Object.freeze({
  created: "Creado",
  assigned: "Asignado",
  pending_info: "Información Pendiente",
  generate_jobs: "Generar Referencia",
  jobs_generated: "Referencias Generadas",
  regenerate_jobs: "Regenerar Referencias",
  generate_contract: "Generar Contrato",
  contract_generated: "Contrato Generado",
  fix_contract: "Corregir Contrato",
  pending_approval: "Pendiente de Aprobación",
  approved: "Aprobado",
  selecting_leave_date: "Eligiendo Fecha de Salida",
  leave_date_selected: "Con Fecha de Salida",
  leave_date_confirmed: "Fecha de Salida Confirmada",
  finalized: "Finalizó",
  inactive: "Temporalmente Inactivo",
  paid: "Pagado",
  unpaid: "Por Pagar",
  imported: "Importado",
  en_proceso: "En Proceso",
  primer_aviso: "Primer Aviso",
})

export const statusColors = Object.freeze({
  Good: {
    bgColor: "bg-emerald-600/10",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-600/60",
  },
  Pending: {
    bgColor: "bg-amber-600/10",
    textColor: "text-amber-500",
    borderColor: "border-amber-600/60",
  },
  Warning: {
    bgColor: "bg-red-600/10",
    textColor: "text-red-500",
    borderColor: "border-red-600/60",
  },
  Default: {
    bgColor: "bg-gray-600/10",
    textColor: "text-gray-500",
    borderColor: "border-gray-600/60",
  },
})

// Utility Functions
export const translateStatus = (status) => {
  if (!status) return "Desconocido"
  return statusLabels[status.toLowerCase()] || status
}

export const getStatusCategory = (status) => {
  const key = status?.toLowerCase()
  switch (key) {
    case "created":
    case "assigned":
    case "jobs_generated":
    case "contract_generated":
    case "approved":
    case "leave_date_selected":
    case "leave_date_confirmed":
    case "finalized":
    case "paid":
    case "imported":
      return "Good"
    case "generate_jobs":
    case "regenerate_jobs":
    case "generate_contract":
    case "pending_approval":
    case "selecting_leave_date":
    case "en_proceso":
      return "Pending"
    case "pending_info":
    case "fix_contract":
    case "inactive":
    case "unpaid":
    case "primer_aviso":
      return "Warning"
    default:
      return "Default"
  }
}

export const getStatusColor = (status) => {
  const category = getStatusCategory(status)
  return statusColors[category] || statusColors.Default
}

const statusUtils = {
  translateStatus,
  getStatusCategory,
  getStatusColor,
}

export default statusUtils
