import PropTypes from "prop-types"
import React from "react"
import UserRoleCard from "@/pages/main/usuarios/components/user-role-card"

export const GroupResponsible = ({ admin, leader }) => (
  <div className="flex w-[270px] flex-col gap-2">
    <p className="text-lg font-normal">Responsables del Grupo</p>
    <div className="flex flex-col gap-4">
      <UserRoleCard {...admin} role="admin" />
      <UserRoleCard {...leader} role="lider" />
    </div>
  </div>
)

GroupResponsible.propTypes = {
  admin: PropTypes.any,
  leader: PropTypes.any,
}

export default GroupResponsible
