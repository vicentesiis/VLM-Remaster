// import React from "react"
// import { Route } from "react-router-dom"
// import { GenericRouteWrapper } from "./GenericRouteWrapper"
// import RoleProtectedRoute from "./RoleProtectedRoute" // your role check wrapper

// const renderRoutes = (routes) =>
//   routes.map(({ path, routeKey, allowedRoles, children }, i) => {
//     const element = routeKey ? <GenericRouteWrapper routeKey={routeKey} /> : <>No Component</>

//     const wrappedElement = allowedRoles ? (
//       <RoleProtectedRoute allowedRoles={allowedRoles}>{element}</RoleProtectedRoute>
//     ) : (
//       element
//     )

//     return (
//       <Route key={i} path={path} element={wrappedElement}>
//         {children && renderRoutes(children)}
//       </Route>
//     )
//   })

// export default renderRoutes