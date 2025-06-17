import React from "react"
import { Navigate } from "react-router-dom"
import { Roles } from "@/constants/appConstants"
import { useUserPermissions } from "@/hooks/useUserPermissions"

const RegistrosIndexRedirect = () => {
  const { role } = useUserPermissions()

  switch (role) {
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
