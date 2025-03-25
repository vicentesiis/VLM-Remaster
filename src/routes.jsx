import React from "react"
import { Tasks, Clients, Orders, Reports, Info, ClientDetail } from "@/pages"

export const routes = [
  {
    path: "/",
    element: <>Home</>, // Assuming Home component for the root page
  },
  {
    path: "/tareas",
    element: <Tasks />,
  },
  {
    path: "/clientes",
    element: <Clients />,
    childrens: [
      {
        path: ":clientId", // This handles dynamic routes like /clientes/:clientId
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
