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

export const GroupResponsible = ({ admin, leader, isLoading }) => {
  const { isAgent } = useCurrentUser()
  
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
        {!isAgent && admin && (
          <div className="relative">
            <UserRoleCard {...admin} role="admin" />
          </div>
        )}

        {/* Leader Section */}
        {leader && (
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
        {!admin && !leader && (
          <div className="rounded-xl border border-dashed bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No hay responsables asignados
            </p>
          </div>
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