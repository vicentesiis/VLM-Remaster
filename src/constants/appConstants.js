export const Roles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  AGENT: "agent",
}

export const recordStatusesLabel = {
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

export const statusToVariantMap = {
  created: "info",
  assigned: "info",
  pending_info: "warning",
  generate_jobs: "warning",
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
  inactive: "destructive", // red
}

export const PaginationDefaults = {
  PAGE_SIZE: 20,
  PAGE_INDEX: 0,
}
