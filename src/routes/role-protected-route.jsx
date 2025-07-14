import PropTypes from "prop-types"
import React from "react"
import { Navigate } from "react-router-dom"
import { Roles } from "@/constants"
import { useAuth } from "@/hooks/useAuth"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { loading } = useAuth()
  const { role, isLeader } = useCurrentUser()

  if (loading) return null

  const isAllowed = () => {
    if (!allowedRoles) return true

    // Special case: user is AGENT + isLeader, and route allows LEADER
    return allowedRoles.some((allowed) => {
      if (allowed === Roles.LEADER && isLeader) return true
      return allowed === role
    })
  }

  return isAllowed() ? children : <Navigate to="/registros" replace />
}

RoleProtectedRoute.propTypes = {
  allowedRoles: PropTypes.any,
  children: PropTypes.any,
}

export default RoleProtectedRoute
