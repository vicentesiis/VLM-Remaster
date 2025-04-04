import React from "react"
import { ClientDetail } from "@/pages/main/clients/client-detail/client-detail"
import { Clients } from "@/pages/main/clients/clients"
import { Info } from "@/pages/main/info/info"
import { Orders } from "@/pages/main/orders/orders"
import { LogAgentReport } from "@/pages/main/reports/log-agent-report/log-agent-report"
import { MonthlySalesReport } from "@/pages/main/reports/monthly-sales-report/monthly-sales-report"
import { Reports } from "@/pages/main/reports/reports"
import { SalesAgentReport } from "@/pages/main/reports/sales-agent-report/sales-agent-report"
import { Tasks } from "@/pages/main/tasks/tasks"

export const routes = [
  {
    path: "/",
    element: <>Home</>,
  },
  {
    path: "/tareas",
    element: <Tasks />,
    allowedRoles: ["super_admin", "agent"],
  },
  {
    path: "/clientes",
    element: <Clients />,
    allowedRoles: ["super_admin", "agent"],
    children: [
      {
        path: ":clientId",
        element: <ClientDetail />,
        allowedRoles: ["super_admin"],
      },
    ],
  },
  {
    path: "/ordenes",
    element: <Orders />,
    allowedRoles: ["super_admin", "agent"],
  },
  {
    path: "/reportes",
    element: <Reports />,
    allowedRoles: ["super_admin", "agent"],
    children: [
      {
        path: "reporte-personal",
        element: <>Reporte Personal</>,
        allowedRoles: ["agent"],
      },
      {
        path: "ventas-por-agente",
        element: <SalesAgentReport />,
        allowedRoles: ["super_admin"],
      },
      {
        path: "registros",
        element: <LogAgentReport />,
        allowedRoles: ["super_admin"],
      },
      {
        path: "ventas-mensuales",
        element: <MonthlySalesReport />,
        allowedRoles: ["super_admin"],
      },
      {
        path: "auditoria-registros",
        element: <>Auditoria de Registros</>,
        allowedRoles: ["super_admin"],
      },
      {
        path: "control-finalizados",
        element: <>Control de Finalizados</>,
        allowedRoles: ["super_admin"],
      },
      {
        path: "ventas-globales",
        element: <>Ventas Globales</>,
        allowedRoles: ["super_admin"],
      },
      {
        path: "ventas-canal",
        element: <>Ventas por Canal</>,
        allowedRoles: ["super_admin"],
      },
      {
        path: "cortes-agente",
        element: <>Cortes por Agente</>,
        allowedRoles: ["super_admin"],
      },
    ],
  },
  {
    path: "/info",
    element: <Info />,
    allowedRoles: ["agent"],
    children: [
      {
        path: "datos-del-proyecto",
        element: <>Datos del Proyecto</>,
        allowedRoles: ["agent"],
      },
      {
        path: "usuarios",
        element: <>Usuarios</>,
        allowedRoles: ["agent"],
      },
      {
        path: "vacantes",
        element: <>Vacantes</>,
        allowedRoles: ["agent"],
      },
    ],
  },
  {
    path: "/ajustes",
    element: <>Ajustes de Sistema</>,
    allowedRoles: ["super_admin"],
    children: [
      {
        path: "ajustes-de-sistema",
        element: <>Ajustes de Sistema</>,
        allowedRoles: ["super_admin"],
      },
      {
        path: "usuarios",
        element: <>Usuarios</>,
        allowedRoles: ["super_admin"],
      },
      {
        path: "cuentas",
        element: <>Cuentas</>,
        allowedRoles: ["super_admin"],
      },
      {
        path: "vacantes",
        element: <>Vacantes</>,
        allowedRoles: ["super_admin"],
      },
    ],
  },
  {
    path: "/unauthorized",
    // TODO: Create a component for unauthorized access
    element: <>Unauthorized Access</>,
  },
]

export default routes
