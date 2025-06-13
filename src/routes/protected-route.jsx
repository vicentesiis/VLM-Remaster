import PropTypes from "prop-types"
import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()

  if (!token) return <Navigate to="/login" replace />

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.any,
}

export default ProtectedRoute
