import React from "react"
import { Route } from "react-router-dom"
import RoleProtectedRoute from "@/routes/role-protected-route"

export const renderRoutes = (routesArray) =>
  routesArray.map(({ path, element, children, allowedRoles }) => {
    const wrappedElement = allowedRoles ? (
      <RoleProtectedRoute allowedRoles={allowedRoles}>
        {element}
      </RoleProtectedRoute>
    ) : (
      element
    )

    return (
      <Route key={path} path={path} element={wrappedElement}>
        {children && renderRoutes(children)}
      </Route>
    )
  })

export default renderRoutes
