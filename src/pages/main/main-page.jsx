import React from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import Navbar from "@/components/customs/navbar/navbar"
import { GenericRouteWrapper } from "@/routes/generic-route-wrapper"
import RoleProtectedRoute from "@/routes/role-protected-route"
import routes from "@/routes/routes"

export const MainPage = () => {
  return (
    <div className="flex h-screen flex-col">
      {/* Sticky navbar */}
      <div className="sticky top-0 z-50 border-b">
        <Navbar />
      </div>
      <div className="flex-grow overflow-auto bg-gray-50 dark:bg-background">
        <Routes>
          <Route path="/*" element={<Navigate to="/registros" replace />} />
          {routes.map(
            ({ path, routeKey, props = {}, children, allowedRoles }) => (
              <Route key={path} path={path} element={<Outlet />}>
                <Route
                  index
                  element={
                    allowedRoles ? (
                      <RoleProtectedRoute allowedRoles={allowedRoles}>
                        <GenericRouteWrapper routeKey={routeKey} {...props} />
                      </RoleProtectedRoute>
                    ) : (
                      <GenericRouteWrapper routeKey={routeKey} {...props} />
                    )
                  }
                />

                {children?.map(
                  ({
                    path: childPath,
                    routeKey: childRouteKey,
                    allowedRoles: childRoles,
                  }) => (
                    <Route
                      key={childPath}
                      path={childPath}
                      element={
                        childRoles ? (
                          <RoleProtectedRoute allowedRoles={childRoles}>
                            <GenericRouteWrapper
                              routeKey={childRouteKey}
                              {...props}
                            />
                          </RoleProtectedRoute>
                        ) : (
                          <GenericRouteWrapper
                            routeKey={childRouteKey}
                            {...props}
                          />
                        )
                      }
                    />
                  )
                )}
              </Route>
            )
          )}
        </Routes>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </div>
  )
}

export default MainPage
