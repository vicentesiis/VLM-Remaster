import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import Navbar from "@/components/navbar"
import routes from "@/routes"

export const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}
export const MainRoutes = () => (
  <Routes>
    {/* The Main component will wrap the nested routes */}
    <Route path="/" element={<Main />}>
      {routes.map(({ path, element, childrens }) => (
        <Route key={path} path={path} element={element}>
          {childrens &&
            childrens.map(({ path: childPath, element: childElement }) => (
              <Route key={childPath} path={childPath} element={childElement} />
            ))}
        </Route>
      ))}
    </Route>
  </Routes>
)

export default Main
