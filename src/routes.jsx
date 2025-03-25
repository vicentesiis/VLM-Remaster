import React from "react"

export const routes = [
  {
    path: "",
    element: <>Bienvenido al Home</>, // Home Page ("/")
  },
  {
    path: "tareas",
    element: <>Tareas</>,
  },
  {
    path: "clientes",
    element: <>Clientes</>,
    childrens: [{ path: ":clientId", element: <>Cliente Detalle</> }],
  },
  {
    path: "ordenes",
    element: <>Órdenes</>,
    childrens: [{ path: "buscar_orden", element: <>Buscar Orden</> }],
  },
  {
    path: "reportes",
    element: <>Reportes</>,
    childrens: [{ path: "reporte_personal", element: <>Reporte Personal</> }],
  },
  {
    path: "info",
    element: <>Info</>,
  },
]

export default routes
