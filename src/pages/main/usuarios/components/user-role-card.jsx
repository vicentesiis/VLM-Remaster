import PropTypes from "prop-types"
import React from "react"
import { ReassignLeaderDialog } from "@/components/customs/dialogs/reassing-leader-dialog"
import { Badge } from "@/components/ui/badge"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const UserRoleCard = ({ name, username, phone, role }) => {
  const { isAdmin } = useCurrentUser()
  const isLeader = role?.toLowerCase() === "lider"
  const canReasingLeader = isLeader && isAdmin

  return (
    <div className="rounded-xl border bg-card p-3 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="break-words text-base font-semibold">{name}</h2>
          <Badge className="capitalize">{role}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex max-w-[70%] flex-col gap-1">
            <p className="break-words text-xs text-muted-foreground">
              {username}
            </p>
            <p className="text-xs text-muted-foreground">{phone}</p>
          </div>

          {canReasingLeader && (
            <ReassignLeaderDialog currentLeaderName={name} />
          )}
          
        </div>
      </div>
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
