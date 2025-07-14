import { useAuth } from "./useAuth"
import { Roles, RolesCapabilities } from "@/constants/appConstants"

export const useCurrentUser = () => {
  const user = useAuth().user?.data || {}
  const isLeader = user.agent_type === "leader"

  const baseCapabilities = RolesCapabilities[user.role] || {}
  const leaderCapabilities = isLeader
    ? RolesCapabilities[Roles.LEADER] || {}
    : {}

  return {
    user,
    id: user.id || null,
    group: user.group || null,
    role: user.role, // stays "agent"
    isSuperAdmin: user.role === Roles.SUPER_ADMIN,
    isAdmin: user.role === Roles.ADMIN,
    isAgent: user.role === Roles.AGENT,
    isLeader,
    ...baseCapabilities,
    ...leaderCapabilities,
  }
}
