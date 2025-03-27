import React from "react"
import { Tasks, Clients, Orders, Reports, Info, ClientDetail } from "@/pages"

export const routes = [
  {
    path: "/tareas",
    element: <Tasks />,
  },
  {
    path: "/clientes",
    element: <Clients />,
    children: [
      {
        path: ":clientId",
        element: <ClientDetail />,
      },
    ],
  },
  {
    path: "/ordenes",
    element: <Orders />,
  },
  {
    path: "/reportes",
    element: <Reports />,
  },
  {
    path: "/info",
    element: <Info />,
  },
]

export default routes
