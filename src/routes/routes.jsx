import React from "react"
import { Ajustes } from "@/pages/main/ajustes/ajustes"
import { Cuentas } from "@/pages/main/ajustes/modules/cuentas"
import { AjustesUsuarios } from "@/pages/main/ajustes/modules/usuarios"
import { Clientes } from "@/pages/main/clientes/clientes"
import { ClientesDetail } from "@/pages/main/clientes/clientes-detail/clientes-detail"
import { Info } from "@/pages/main/info/info"
import { Registros } from "@/pages/main/registros/registros"
import { ReportesReporteDeRegistros } from "@/pages/main/reportes/modules/reportes-reporte-de-registros"
import { ReportesReporteVentasPorAgente } from "@/pages/main/reportes/modules/reportes-reporte-de-ventas-por-agente"
import { ReportesReporteVentalMensual } from "@/pages/main/reportes/modules/reportes-reporte-venta-mensual"
import { ReportesReporteVentasGlobales } from "@/pages/main/reportes/modules/reportes-reporte-ventas-globales"
import { Reportes } from "@/pages/main/reportes/reportes"
import { Vacantes } from "@/pages/main/vacantes/vacantes"

export const routes = [
  {
    path: "/registros",
    element: <Registros />,
    allowedRoles: ["super_admin", "admin", "agent"],
    children: [
      {
        path: "registros",
        element: <Registros />,
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "mis-registros",
        element: <>Mis Registros</>,
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "clientes",
        element: <Clientes />,
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "clientes/:clientId",
        element: <ClientesDetail />,
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "mis-clientes",
        element: <>Mis Clientes</>,
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "mis-tareas",
        element: <>Mis Tareas</>,
        allowedRoles: ["super_admin", "admin", "agent"],
      },
    ],
  },
  {
    path: "/vacantes",
    element: <Vacantes />,
    allowedRoles: ["super_admin", "admin", "agent"],
  },
  {
    path: "/reportes",
    element: <Reportes />,
    allowedRoles: ["super_admin", "admin", "agent"],
    children: [
      {
        path: "reporte-personal",
        element: <>Reporte Personal</>,
        allowedRoles: ["agent"],
      },
      {
        path: "ventas-por-agente",
        element: <ReportesReporteVentasPorAgente />,
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "registros",
        element: <ReportesReporteDeRegistros />,
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "ventas-mensuales",
        element: <ReportesReporteVentalMensual />,
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "auditoria-registros",
        element: <>Auditoria de Registros</>,
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "control-finalizados",
        element: <>Control de Finalizados</>,
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "ventas-globales",
        element: <ReportesReporteVentasGlobales />,
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "ventas-canal",
        element: <>Ventas por Canal</>,
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "cortes-agente",
        element: <>Cortes por Agente</>,
        allowedRoles: ["super_admin", "admin"],
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
    ],
  },
  {
    path: "/ajustes",
    element: <Ajustes />,
    allowedRoles: ["super_admin", "admin"],
    children: [
      {
        path: "usuarios",
        element: <AjustesUsuarios />,
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "cuentas",
        element: <Cuentas />,
        allowedRoles: ["super_admin", "admin"],
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
