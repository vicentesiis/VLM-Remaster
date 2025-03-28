import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import Navbar from "@/components/customs/navbar/navbar"
import routes from "@/routes"

export const Main = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 border-b bg-background">
        <Navbar />
      </div>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Outlet />}>
            {routes.map(({ path, element, children }) => (
              <Route key={path} path={path} element={<Outlet />}>
                <Route index element={element} />
                {children?.map(({ path: childPath, element: childElement }) => (
                  <Route
                    key={childPath}
                    path={childPath}
                    element={childElement}
                  />
                ))}
              </Route>
            ))}
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Main
