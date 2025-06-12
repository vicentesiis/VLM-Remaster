import React from "react"
import { Navigate } from "react-router-dom"
import { Roles } from "@/constants/appConstants"
import { useAuth } from "@/hooks"

const RegistrosIndexRedirect = () => {
  const { user } = useAuth()
  const currentRole = user.data.role

  switch (currentRole) {
    case Roles.SUPER_ADMIN:
    case Roles.ADMIN:
      return <Navigate to="/registros/registros" replace />
    case Roles.AGENT:
      return <Navigate to="/registros/mis-registros" replace />
    default:
      return <Navigate to="/unauthorized" replace />
  }
}

export default RegistrosIndexRedirect
