import { Roles } from "@/constants/appConstants"

export const routes = [
  {
    path: "/registros",
    routeKey: "home",
    allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
    children: [
      {
        path: "registros",
        routeKey: "registros",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "mis-prospectos",
        routeKey: "misProspectos",
        allowedRoles: [Roles.AGENT],
      },
      {
        path: "mis-leads",
        routeKey: "misLeads",
        allowedRoles: [Roles.AGENT],
      },
      {
        path: "clientes",
        routeKey: "clientes",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "detalle/:public_id",
        routeKey: "registroDetail",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
      },
      {
        path: "mis-clientes",
        routeKey: "misClientes",
        allowedRoles: [Roles.AGENT],
      },
      {
        path: "tareas",
        routeKey: "tareas",
        allowedRoles: [Roles.AGENT],
      },
    ],
  },
  {
    path: "/vacantes",
    routeKey: "vacantes",
    allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
    children: [
      {
        path: "detalle/:id",
        routeKey: "vacantDetail",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
      },
    ],
  },
  {
    path: "/ventas",
    routeKey: "ventas",
    allowedRoles: [Roles.AGENT],
  },
  {
    path: "/usuarios",
    routeKey: "usuarios",
    allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
  },
  {
    path: "/reportes",
    routeKey: "reportes",
    allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
    children: [
      {
        path: "Ventas por Agente (Ventas)",
        routeKey: "reportePersonal",
        allowedRoles: ["LEADERRRR"],
      },
      {
        path: "ventas-por-agente",
        routeKey: "reportesReporteVentasPorAgente",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "registros",
        routeKey: "reportesReporteDeRegistros",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "ventas-mensuales",
        routeKey: "reportesReporteVentalMensual",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "auditoria-registros",
        routeKey: "auditoriaDeRegistros",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "control-finalizados",
        routeKey: "reporteReporteRecordFinalizado",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "ventas-globales",
        routeKey: "reportesReporteVentasGlobales",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "ventas-canal",
        routeKey: "ventasPorCanal",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "cortes-agente",
        routeKey: "reportesReporteCorteAgente",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
    ],
  },
  {
    path: "/ajustes",
    routeKey: "ajustes",
    allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
    children: [
      {
        path: "usuarios",
        routeKey: "ajustesUsuarios",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "cuentas",
        routeKey: "cuentas",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
    ],
  },
  {
    path: "/unauthorized",
    routeKey: "unauthorizedAccess",
  },
]

export default routes
