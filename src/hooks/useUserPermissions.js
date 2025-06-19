import { useAuth } from "./useAuth"
import { Roles, RolesCapabilities } from "@/constants/appConstants"

export const useUserPermissions = () => {
  const user = useAuth().user?.data || {}
  const capabilities = RolesCapabilities[user.role] || {}

  return {
    id: user.id || null,
    role: user.role || null,
    group: user.group || null,
    isSuperAdmin: user.role === Roles.SUPER_ADMIN,
    isAdmin: user.role === Roles.ADMIN,
    isAgent: user.role === Roles.AGENT,
    isLeader: user.agent_type === "leader",
    ...capabilities,
  }
}
