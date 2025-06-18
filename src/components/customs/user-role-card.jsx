import PropTypes from "prop-types"
import React from "react"
import { Badge } from "@/components/ui/badge"

const UserRoleCard = ({ name, username, phone, role }) => {
  return (
    <div className="space-y-0 rounded-xl border bg-card p-4 shadow-sm">
      <span className="text-md font-semibold text-primary">{name}</span>
      <p className="text-sm text-muted-foreground">{username}</p>
      <p className="text-sm text-muted-foreground">{phone}</p>
      <Badge className="capitalize">{role}</Badge>
    </div>
  )
}

UserRoleCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  role: PropTypes.string,
  username: PropTypes.string,
}

export default UserRoleCard
