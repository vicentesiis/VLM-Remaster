export const Roles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  AGENT: "agent",
}

export const RecordStatuses = Object.freeze({
  CREATED: "created",
  ASSIGNED: "assigned",
  PENDING_INFO: "pending_info",
  GENERATE_JOBS: "generate_jobs",
  JOBS_GENERATED: "jobs_generated",
  REGENERATE_JOBS: "regenerate_jobs",
  GENERATE_CONTRACT: "generate_contract",
  CONTRACT_GENERATED: "contract_generated",
  FIX_CONTRACT: "fix_contract",
  PENDING_APPROVAL: "pending_approval",
  APPROVED: "approved",
  SELECTING_LEAVE_DATE: "selecting_leave_date",
  LEAVE_DATE_SELECTED: "leave_date_selected",
  LEAVE_DATE_CONFIRMED: "leave_date_confirmed",
  FINALIZED: "finalized",
  INACTIVE: "inactive",
})

export const RECORD_STATUSES_LABEL = {
  [RecordStatuses.CREATED]: "Creado",
  [RecordStatuses.ASSIGNED]: "Asignado",
  [RecordStatuses.PENDING_INFO]: "Pendiente de información",
  [RecordStatuses.GENERATE_JOBS]: "Generar trabajos",
  [RecordStatuses.JOBS_GENERATED]: "Trabajos generados",
  [RecordStatuses.REGENERATE_JOBS]: "Regenerar trabajos",
  [RecordStatuses.GENERATE_CONTRACT]: "Generar contrato",
  [RecordStatuses.CONTRACT_GENERATED]: "Contrato generado",
  [RecordStatuses.FIX_CONTRACT]: "Corregir contrato",
  [RecordStatuses.PENDING_APPROVAL]: "Pendiente de aprobación",
  [RecordStatuses.APPROVED]: "Aprobado",
  [RecordStatuses.SELECTING_LEAVE_DATE]: "Seleccionando fecha de salida",
  [RecordStatuses.LEAVE_DATE_SELECTED]: "Fecha de salida seleccionada",
  [RecordStatuses.LEAVE_DATE_CONFIRMED]: "Fecha de salida confirmada",
  [RecordStatuses.FINALIZED]: "Finalizado",
  [RecordStatuses.INACTIVE]: "Inactivo",
}

export const STATUS_TO_VARIANT_MAP = {
  [RecordStatuses.CREATED]: "success",
  [RecordStatuses.ASSIGNED]: "info",
  [RecordStatuses.PENDING_INFO]: "warning",
  [RecordStatuses.GENERATE_JOBS]: "info",
  [RecordStatuses.JOBS_GENERATED]: "info",
  [RecordStatuses.REGENERATE_JOBS]: "warning",
  [RecordStatuses.GENERATE_CONTRACT]: "info",
  [RecordStatuses.CONTRACT_GENERATED]: "info",
  [RecordStatuses.FIX_CONTRACT]: "warning",
  [RecordStatuses.PENDING_APPROVAL]: "warning",
  [RecordStatuses.APPROVED]: "success",
  [RecordStatuses.SELECTING_LEAVE_DATE]: "info",
  [RecordStatuses.LEAVE_DATE_SELECTED]: "info",
  [RecordStatuses.LEAVE_DATE_CONFIRMED]: "success",
  [RecordStatuses.FINALIZED]: "success",
  [RecordStatuses.INACTIVE]: "destructive",
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
export const PaymentStatuses = Object.freeze({
  CREATED: "created",
  PENDING: "pending_payment",
  PAID: "paid",
  CANCELLED: "cancelled",
  FAILED: "failed",
  EXPIRED: "expired",
})

export const PAYMENT_STATUSES_LABEL = {
  [PaymentStatuses.CREATED]: "Creado",
  [PaymentStatuses.PENDING]: "Pendiente de Pago",
  [PaymentStatuses.PAID]: "Pagado",
  [PaymentStatuses.CANCELLED]: "Cancelado",
  [PaymentStatuses.FAILED]: "Fallido",
  [PaymentStatuses.EXPIRED]: "Expirado",
}

export const PAYMENT_STATUS_TO_VARIANT_MAP = {
  [PaymentStatuses.CREATED]: "info",
  [PaymentStatuses.PENDING]: "warning",
  [PaymentStatuses.PAID]: "success",
  [PaymentStatuses.CANCELLED]: "destructive",
  [PaymentStatuses.FAILED]: "destructive",
  [PaymentStatuses.EXPIRED]: "secondary",
}

// Available status for Agent
export const AGENT_ALLOWED_STATUS_LIST = [
  RecordStatuses.PENDING_INFO,
  RecordStatuses.GENERATE_JOBS,
  RecordStatuses.REGENERATE_JOBS,
  RecordStatuses.GENERATE_CONTRACT,
  RecordStatuses.FIX_CONTRACT,
  RecordStatuses.PENDING_APPROVAL,
  RecordStatuses.SELECTING_LEAVE_DATE,
  RecordStatuses.LEAVE_DATE_SELECTED,
  RecordStatuses.FINALIZED,
  RecordStatuses.INACTIVE,
]

// Agent & default transitions
export const NEXT_STATUS_MAP = {
  [RecordStatuses.ASSIGNED]: [
    RecordStatuses.PENDING_INFO,
    RecordStatuses.GENERATE_JOBS,
    RecordStatuses.GENERATE_CONTRACT,
  ],
  [RecordStatuses.PENDING_INFO]: [
    RecordStatuses.GENERATE_JOBS,
    RecordStatuses.JOBS_GENERATED,
    RecordStatuses.REGENERATE_JOBS,
    RecordStatuses.GENERATE_CONTRACT,
    RecordStatuses.CONTRACT_GENERATED,
    RecordStatuses.FIX_CONTRACT,
  ],
  [RecordStatuses.GENERATE_JOBS]: [
    RecordStatuses.PENDING_INFO,
    RecordStatuses.FINALIZED,
    RecordStatuses.INACTIVE,
  ],
  [RecordStatuses.JOBS_GENERATED]: [
    RecordStatuses.PENDING_INFO,
    RecordStatuses.GENERATE_JOBS,
  ],
  [RecordStatuses.REGENERATE_JOBS]: [
    RecordStatuses.PENDING_INFO,
    RecordStatuses.JOBS_GENERATED,
  ],
  [RecordStatuses.GENERATE_CONTRACT]: [
    RecordStatuses.PENDING_INFO,
    RecordStatuses.FINALIZED,
    RecordStatuses.INACTIVE,
  ],
  [RecordStatuses.CONTRACT_GENERATED]: [
    RecordStatuses.PENDING_INFO,
    RecordStatuses.GENERATE_CONTRACT,
    RecordStatuses.FIX_CONTRACT,
    RecordStatuses.PENDING_APPROVAL,
  ],
  [RecordStatuses.FIX_CONTRACT]: [
    RecordStatuses.PENDING_INFO,
    RecordStatuses.CONTRACT_GENERATED,
  ],
  [RecordStatuses.PENDING_APPROVAL]: [RecordStatuses.CONTRACT_GENERATED],
  [RecordStatuses.APPROVED]: [RecordStatuses.PENDING_APPROVAL],
  [RecordStatuses.SELECTING_LEAVE_DATE]: [RecordStatuses.APPROVED],
  [RecordStatuses.LEAVE_DATE_SELECTED]: [RecordStatuses.SELECTING_LEAVE_DATE],
  [RecordStatuses.LEAVE_DATE_CONFIRMED]: [RecordStatuses.LEAVE_DATE_SELECTED],
  [RecordStatuses.FINALIZED]: [
    RecordStatuses.PENDING_INFO,
    RecordStatuses.GENERATE_JOBS,
    RecordStatuses.REGENERATE_JOBS,
  ],
  [RecordStatuses.INACTIVE]: [
    RecordStatuses.PENDING_INFO,
    RecordStatuses.GENERATE_JOBS,
    RecordStatuses.REGENERATE_JOBS,
    RecordStatuses.GENERATE_CONTRACT,
    RecordStatuses.CONTRACT_GENERATED,
    RecordStatuses.FIX_CONTRACT,
  ],
  [RecordStatuses.CREATED]: [], // not handled for agents
}

// Admin transitions
export const NEXT_STATUS_MAP_FOR_ADMIN = {
  [RecordStatuses.CREATED]: Object.values(RecordStatuses),

  [RecordStatuses.ASSIGNED]: NEXT_STATUS_MAP[RecordStatuses.ASSIGNED],

  [RecordStatuses.PENDING_INFO]: NEXT_STATUS_MAP[RecordStatuses.PENDING_INFO],

  [RecordStatuses.GENERATE_JOBS]: [
    RecordStatuses.CREATED,
    RecordStatuses.ASSIGNED,
    ...NEXT_STATUS_MAP[RecordStatuses.GENERATE_JOBS],
  ],

  [RecordStatuses.JOBS_GENERATED]:
    NEXT_STATUS_MAP[RecordStatuses.JOBS_GENERATED],

  [RecordStatuses.REGENERATE_JOBS]:
    NEXT_STATUS_MAP[RecordStatuses.REGENERATE_JOBS],

  [RecordStatuses.GENERATE_CONTRACT]: [
    RecordStatuses.CREATED,
    RecordStatuses.ASSIGNED,
    RecordStatuses.PENDING_INFO,
    RecordStatuses.CONTRACT_GENERATED,
    RecordStatuses.FINALIZED,
    RecordStatuses.INACTIVE,
  ],

  [RecordStatuses.CONTRACT_GENERATED]: [
    ...NEXT_STATUS_MAP[RecordStatuses.CONTRACT_GENERATED],
    RecordStatuses.PENDING_APPROVAL,
  ],

  [RecordStatuses.FIX_CONTRACT]: NEXT_STATUS_MAP[RecordStatuses.FIX_CONTRACT],

  [RecordStatuses.PENDING_APPROVAL]: [
    RecordStatuses.APPROVED,
  ],

  [RecordStatuses.APPROVED]: [RecordStatuses.SELECTING_LEAVE_DATE],

  [RecordStatuses.SELECTING_LEAVE_DATE]: [RecordStatuses.LEAVE_DATE_SELECTED],

  [RecordStatuses.LEAVE_DATE_SELECTED]: [RecordStatuses.LEAVE_DATE_CONFIRMED],

  [RecordStatuses.LEAVE_DATE_CONFIRMED]: [
    RecordStatuses.FINALIZED,
    RecordStatuses.INACTIVE,
  ],

  [RecordStatuses.FINALIZED]: NEXT_STATUS_MAP[RecordStatuses.FINALIZED],

  [RecordStatuses.INACTIVE]: NEXT_STATUS_MAP[RecordStatuses.INACTIVE],
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
