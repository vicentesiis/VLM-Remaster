import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { currentRole } = useAuth()

  if (!allowedRoles || allowedRoles.includes(currentRole)) {
    return children
  }

  return <Navigate to="/unauthorized" replace />
}

export default RoleProtectedRoute
