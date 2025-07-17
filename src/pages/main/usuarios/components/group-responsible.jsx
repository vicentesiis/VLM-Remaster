import PropTypes from "prop-types"
import React from "react"
import ActiveStatusBadge from "@/components/customs/badge/active-status-badge"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import UserRoleCard from "@/pages/main/usuarios/components/user-role-card"


export const GroupResponsible = ({ admin, leader, group }) => {
  const { isAgent } = useCurrentUser()
  console.log(group)
  return (
    <div className="flex flex-col gap-2 sm:w-[270px]">
      <div className="flex flex-col gap-4">
        

        {!isAgent && (
          <div className="relative">
            <UserRoleCard {...admin} role="admin" />
          </div>
        )}

        <div className="relative">
          <UserRoleCard {...leader} role="lider" />
          {typeof leader?.active === "boolean" && !leader.active && (
            <div className="absolute -right-2 -top-2">
              <ActiveStatusBadge isActive={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

GroupResponsible.propTypes = {
  admin: PropTypes.any,
  leader: PropTypes.any,
  group: PropTypes.object, // 👈 agregamos esta prop
}

export default GroupResponsible