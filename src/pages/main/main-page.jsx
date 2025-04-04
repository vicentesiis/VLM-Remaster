import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import Navbar from "@/components/customs/navbar/navbar"
import RoleProtectedRoute from "@/routes/role-protected-route"
import routes from "@/routes/routes"

export const Main = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {" "}
      {/* Prevent scrolling on body */}
      <div className="sticky top-0 z-50 border-b bg-background">
        <Navbar />
      </div>
      <div className="flex-grow overflow-auto py-4">
        {/* Routes and content */}
        <Routes>
          {routes.map(({ path, element, children, allowedRoles }) => (
            <Route key={path} path={path} element={<Outlet />}>
              <Route
                index
                element={
                  allowedRoles ? (
                    <RoleProtectedRoute allowedRoles={allowedRoles}>
                      {element}
                    </RoleProtectedRoute>
                  ) : (
                    element
                  )
                }
              />
              {children?.map(
                ({
                  path: childPath,
                  element: childElement,
                  allowedRoles: childRoles,
                }) => (
                  <Route
                    key={childPath}
                    path={childPath}
                    element={
                      childRoles ? (
                        <RoleProtectedRoute allowedRoles={childRoles}>
                          {childElement}
                        </RoleProtectedRoute>
                      ) : (
                        childElement
                      )
                    }
                  />
                )
              )}
            </Route>
          ))}
        </Routes>
      </div>
    </div>
  )
}

export default Main
