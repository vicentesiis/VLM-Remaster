import PropTypes from "prop-types"
import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { loading } = useAuth()
  const { role } = useCurrentUser()

  if (loading) {
    return null
  }

  if (!allowedRoles || allowedRoles.includes(role)) {
    return children
  }

  return <Navigate to="/registros" replace />
}

RoleProtectedRoute.propTypes = {
  allowedRoles: PropTypes.any,
  children: PropTypes.any,
}

export default RoleProtectedRoute
