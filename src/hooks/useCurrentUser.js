import { useAuth } from "./useAuth"
import { Roles, RolesCapabilities } from "@/constants/appConstants"

export const useCurrentUser = () => {
  const user = useAuth().user?.data || {}
  const capabilities = RolesCapabilities[user.role] || {}

  const isLeader = user.agent_type === "leader"
  const computedRole = isLeader ? "leader" : user.role

  return {
    user,
    group: user.group,
    id: user.id || null,
    role: computedRole,
    group: user.group || null,
    isSuperAdmin: computedRole === Roles.SUPER_ADMIN,
    isAdmin: computedRole === Roles.ADMIN,
    isAgent: computedRole === Roles.AGENT,
    isLeader,
    ...capabilities,
  }
}
