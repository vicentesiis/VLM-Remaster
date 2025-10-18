export const Roles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  AGENT: "agent",
  LEADER: "leader",
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
    canCreateOrders: false,
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