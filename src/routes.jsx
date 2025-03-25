import React from "react"
import { Tasks, Clients, Orders, Reports, Info } from "@/pages"

export const routes = [
  {
    path: "",
    element: <>Home</>,
  },
  {
    path: "tareas",
    element: <Tasks />,
  },
  {
    path: "clientes",
    element: <Clients />,
    childrens: [{ path: ":clientId", element: <Clients />}],
  },
  {
    path: "ordenes",
    element: <Orders />,
    childrens: [{ path: "buscar_orden", element: <Orders />,}],
  },
  {
    path: "reportes",
    element: <Reports />,
    childrens: [{ path: "reporte_personal", element: <Reports />,}],
  },
  {
    path: "Info",
    element: <Tasks />,
  },
]

export default routes
