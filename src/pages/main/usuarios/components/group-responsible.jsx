import PropTypes from "prop-types"
import React from "react"
import ActiveStatusBadge from "@/components/customs/badge/active-status-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import UserRoleCard from "@/pages/main/usuarios/components/user-role-card"


const LoadingSkeleton = () => (
  <div className="rounded-xl border bg-card p-3 shadow-sm">
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  </div>
)

export const GroupResponsible = ({ admin, leader, group, isLoading }) => {
  const { isAgent } = useCurrentUser()
  const hasSelectedGroup = Boolean(group)
  const hasAdmin = Boolean(admin && Object.keys(admin).length > 0)
  const hasLeader = Boolean(leader && Object.keys(leader).length > 0)
  
  if (isLoading) {
    return (
      <div className="w-full sm:w-[300px]">
        <div className="space-y-3">
          {!isAgent && <LoadingSkeleton />}
          <LoadingSkeleton />
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full sm:w-[300px]">
      <div className="space-y-3">
        {/* Admin Section */}
        {!isAgent && hasAdmin && (
          <div className="relative">
            <UserRoleCard {...admin} role="admin" />
          </div>
        )}

        {/* Leader Section */}
        {hasLeader && (
          <div className="relative">
            <UserRoleCard {...leader} role="lider" />
            {typeof leader?.active === "boolean" && !leader.active && (
              <div className="absolute -right-2 -top-2 z-10">
                <ActiveStatusBadge isActive={false} />
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!hasAdmin && !hasLeader && (
          <UserRoleCard
            isEmpty
            emptyTitle={
              hasSelectedGroup
                ? "Sin responsables asignados"
                : "Selecciona un grupo"
            }
            emptyDescription={
              hasSelectedGroup
                ? "Este grupo no tiene admin ni líder activos por ahora."
                : "Elige un grupo y presiona Buscar para ver sus responsables."
            }
          />
        )}
      </div>
    </div>
  )
}

GroupResponsible.propTypes = {
  admin: PropTypes.any,
  leader: PropTypes.any,
  group: PropTypes.object,
  isLoading: PropTypes.bool,
}

export default GroupResponsible
