import React from "react"
import { Navigate } from "react-router-dom"
import { Roles } from "@/constants/appConstants"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const RegistrosIndexRedirect = () => {
  const { role } = useCurrentUser()
  switch (role) {
    case Roles.SUPER_ADMIN:
      return <Navigate to="/registros/registros" replace />
    case Roles.ADMIN: case Roles.AGENT: case Roles.LEADER:
      return <Navigate to="/dashboard" replace />


    default:
      return <Navigate to="/unauthorized" replace />
  }
}

export default RegistrosIndexRedirect
