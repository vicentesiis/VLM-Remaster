import PropTypes from "prop-types"
import React from "react"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import UserRoleCard from "@/pages/main/usuarios/components/user-role-card"

export const GroupResponsible = ({ admin, leader }) => {
  const { isAgent } = useCurrentUser()

  return (
    <div className="flex flex-col gap-2 sm:w-[270px]">
      <p className="text-lg font-normal">
        {!isAgent ? "Responsables del Equipo" : ""}
      </p>
      <div className="flex flex-col gap-4">
        {!isAgent && <UserRoleCard {...admin} role="admin" />}
        <UserRoleCard {...leader} role="lider" />
      </div>
    </div>
  )
}

GroupResponsible.propTypes = {
  admin: PropTypes.any,
  leader: PropTypes.any,
}

export default GroupResponsible
