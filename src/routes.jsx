import React from "react"
import { ClientDetail } from "@/pages/main/clients/client-detail/client-detail"
import { Clients } from "@/pages/main/clients/clients"
import { Info } from "@/pages/main/info/info"
import { Orders } from "@/pages/main/orders/orders"
import { Reports } from "@/pages/main/reports/reports"
import { SalesReport } from "@/pages/main/reports/sales-report/sales-report"
import { Tasks } from "@/pages/main/tasks/tasks"

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
    children: [
      {
        path: "reporte-de-ventas",
        element: <SalesReport />,
      },
    ],
  },
  {
    path: "/info",
    element: <Info />,
  },
]

export default routes
