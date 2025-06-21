export const Roles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  AGENT: "agent",
}

export const RECORD_STATUSES_LABEL = {
  created: "Creado",
  assigned: "Asignado",
  pending_info: "Pendiente de información",
  generate_jobs: "Generar trabajos",
  jobs_generated: "Trabajos generados",
  regenerate_jobs: "Regenerar trabajos",
  generate_contract: "Generar contrato",
  contract_generated: "Contrato generado",
  fix_contract: "Corregir contrato",
  pending_approval: "Pendiente de aprobación",
  approved: "Aprobado",
  selecting_leave_date: "Seleccionando fecha de salida",
  leave_date_selected: "Fecha de salida seleccionada",
  leave_date_confirmed: "Fecha de salida confirmada",
  finalized: "Finalizado",
  inactive: "Inactivo",
}

export const STATUS_TO_VARIANT_MAP = {
  created: "success",
  assigned: "info",
  pending_info: "warning",
  generate_jobs: "info",
  jobs_generated: "info",
  regenerate_jobs: "warning",
  generate_contract: "info",
  contract_generated: "info",
  fix_contract: "warning",
  pending_approval: "warning",
  approved: "success",
  selecting_leave_date: "info",
  leave_date_selected: "info",
  leave_date_confirmed: "success",
  finalized: "success",
  inactive: "destructive",
}

export const RolesCapabilities = {
  [Roles.SUPER_ADMIN]: {
    canManageRecords: true,
    canCreateOrders: true,
    canDeleteUsers: true,
    canViewReports: true,
  },
  [Roles.ADMIN]: {
    canManageRecords: true,
    canCreateOrders: true,
    canDeleteUsers: false,
    canViewReports: true,
  },
  [Roles.AGENT]: {
    canManageRecords: false,
    canCreateOrders: false,
    canDeleteUsers: false,
    canViewReports: true,
  },
}

// Payment Statuses
export const PAYMENT_STATUSES_LABEL = {
  created: "Creado",
  pending_payment: "Pendiente de Pago",
  paid: "Pagado",
  cancelled: "Cancelado",
  failed: "Fallido",
  expired: "Expirado",
}

export const PAYMENT_STATUS_TO_VARIANT_MAP = {
  created: "info",
  pending_payment: "warning",
  paid: "success",
  cancelled: "destructive",
  failed: "destructive",
  expired: "secondary",
}

// Available status for Agent
export const AGENT_ALLOWED_STATUS_LIST = [
  "pending_info",
  "generate_jobs",
  "regenerate_jobs",
  "generate_contract",
  "fix_contract",
  "pending_approval",
  "selecting_leave_date",
  "leave_date_selected",
  "finalized",
  "inactive",
]

export const NEXT_STATUS_MAP = {
  assigned: ["pending_info", "generate_jobs", "generate_contract"],
  pending_info: [
    "generate_jobs",
    "jobs_generated",
    "regenerate_jobs",
    "generate_contract",
    "contract_generated",
    "fix_contract",
  ],
  generate_jobs: ["pending_info", "finalized", "inactive"],
  jobs_generated: ["pending_info", "generate_jobs"],
  regenerate_jobs: ["pending_info", "jobs_generated"],
  generate_contract: ["pending_info", "finalized", "inactive"],
  contract_generated: ["pending_info", "generate_contract", "fix_contract"],
  fix_contract: ["pending_info", "contract_generated"],
  pending_approval: ["contract_generated"],
  approved: ["pending_approval"],
  selecting_leave_date: ["approved"],
  leave_date_selected: ["selecting_leave_date"],
  leave_date_confirmed: ["leave_date_selected"],
  finalized: ["pending_info", "generate_jobs", "regenerate_jobs"],
  inactive: [
    "pending_info",
    "generate_jobs",
    "regenerate_jobs",
    "generate_contract",
    "contract_generated",
    "fix_contract",
  ],
}

export const months = [
  { label: "Enero", value: "01" },
  { label: "Febrero", value: "02" },
  { label: "Marzo", value: "03" },
  { label: "Abril", value: "04" },
  { label: "Mayo", value: "05" },
  { label: "Junio", value: "06" },
  { label: "Julio", value: "07" },
  { label: "Agosto", value: "08" },
  { label: "Septiembre", value: "09" },
  { label: "Octubre", value: "10" },
  { label: "Noviembre", value: "11" },
  { label: "Diciembre", value: "12" },
]
