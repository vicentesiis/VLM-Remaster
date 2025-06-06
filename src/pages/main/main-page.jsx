import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import Navbar from "@/components/customs/navbar/navbar"
import { GenericRouteWrapper } from "@/routes/generic-route-wrapper"
import RoleProtectedRoute from "@/routes/role-protected-route"
import routes from "@/routes/routes"

export const Main = () => {
  return (
    <div className="flex h-screen flex-col sm:pb-0">
      {/* Sticky navbar */}
      <div className="sticky top-0 z-50 border-b">
        <Navbar />
      </div>

      <div className="flex-grow overflow-auto sm:py-4">
        <Routes>
          {routes.map(
            ({ path, routeKey, title, props = {}, children, allowedRoles }) => (
              <Route key={path} path={path} element={<Outlet />}>
                <Route
                  index
                  element={
                    allowedRoles ? (
                      <RoleProtectedRoute allowedRoles={allowedRoles}>
                        <GenericRouteWrapper
                          routeKey={routeKey}
                          title={title}
                          {...props}
                        />
                      </RoleProtectedRoute>
                    ) : (
                      <GenericRouteWrapper
                        routeKey={routeKey}
                        title={title}
                        {...props}
                      />
                    )
                  }
                />

                {children?.map(
                  ({
                    path: childPath,
                    routeKey: childRouteKey,
                    title: childTitle,
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
                              title={childTitle}
                              {...props}
                            />
                          </RoleProtectedRoute>
                        ) : (
                          <GenericRouteWrapper
                            routeKey={childRouteKey}
                            title={childTitle}
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
    </div>
  )
}

export default Main
