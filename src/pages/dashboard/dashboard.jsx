import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"
// import { StickyNavbar } from "@/ui/components"
import routes from "@/routes"

export function Dashboard() {
  return (
    // <div className='bg-gray-200'>
    //   <div className='sticky top-0 z-50'>
    //     <StickyNavbar />
    //   </div>
    <div className=''>
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "dashboard" &&
            pages.map(({ path, element, childrens }) => (
              <Route key={path} path={path} element={<Outlet />}>
                <Route index element={element} />
                {childrens &&
                  childrens.map(
                    ({ path: childPath, element: childElement }) => (
                      <Route
                        key={childPath}
                        path={childPath}
                        element={childElement}
                      />
                    )
                  )}
              </Route>
            ))
        )}
      </Routes>
    </div>
    // </div>
  )
}

Dashboard.displayName = "/src/layout/dashboard.jsx"

export default Dashboard
