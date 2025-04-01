import React from "react"
import { ClientDetail } from "@/pages/main/clients/client-detail/client-detail"
import { Clients } from "@/pages/main/clients/clients"
import { Info } from "@/pages/main/info/info"
import { Orders } from "@/pages/main/orders/orders"
import { LogAgentReport } from "@/pages/main/reports/log-agent-report/log-agent-report"
import { Reports } from "@/pages/main/reports/reports"
import { SalesAgentReport } from "@/pages/main/reports/sales-agent-report/sales-agent-report"
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
        path: "reporte-de-ventas-por-agente",
        element: <SalesAgentReport />,
      },
      {
        path: "reporte-de-registros-de-agente",
        element: <LogAgentReport />,
      },
    ],
  },
  {
    path: "/info",
    element: <Info />,
  },
]

export default routes
