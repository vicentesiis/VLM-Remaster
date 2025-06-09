export const Roles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  AGENT: "agent",
}

export const Statuses = {
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
}

export const PaginationDefaults = {
  PAGE_SIZE: 20,
  PAGE_INDEX: 0,
}
