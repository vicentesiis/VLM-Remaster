import { Roles } from "@/constants/appConstants"

export const routes = [
  {
    path: "/tareas",
    routeKey: "tareas",
    allowedRoles: [Roles.AGENT, Roles.LEADER, Roles.ADMIN],
  },
  {
    path: "/registros",
    allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT, Roles.LEADER],
    routeKey: "home",
    children: [
      {
        path: "registros",
        routeKey: "registros",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "mis-prospectos",
        routeKey: "misProspectos",
        allowedRoles: [Roles.AGENT, Roles.LEADER],
      },
      {
        path: "mis-leads",
        routeKey: "misLeads",
        allowedRoles: [Roles.AGENT, Roles.LEADER],
      },
      {
        path: "clientes",
        routeKey: "clientes",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "detalle/:public_id",
        routeKey: "registroDetail",
        allowedRoles: [
          Roles.SUPER_ADMIN,
          Roles.ADMIN,
          Roles.AGENT,
          Roles.LEADER,
        ],
      },
      {
        path: "mis-clientes",
        routeKey: "misClientes",
        allowedRoles: [Roles.AGENT, Roles.LEADER],
      },
    ],
  },
  {
    path: "/vacantes",
    routeKey: "vacantes",
    allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT, Roles.LEADER],
    children: [
      {
        path: "detalle/:id",
        routeKey: "vacantDetail",
        allowedRoles: [
          Roles.SUPER_ADMIN,
          Roles.ADMIN,
          Roles.AGENT,
          Roles.LEADER,
        ],
      },
    ],
  },
  {
    path: "/reportes/ventas-por-agente",
    routeKey: "reportesReporteVentasPorAgente",
    allowedRoles: [Roles.AGENT, Roles.LEADER, Roles.SUPER_ADMIN, Roles.ADMIN],
  },
  {
    path: "/reportes/ventas-activas-por-cobrar",
    routeKey: "reportesReporteVentasActivasPorCobrar",
    allowedRoles: [Roles.AGENT, Roles.LEADER, Roles.SUPER_ADMIN, Roles.ADMIN],
  },
  {
    path: "/usuarios",
    routeKey: "usuarios",
    allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT, Roles.LEADER],
  },
  {
    path: "/reportes",
    routeKey: "reportes",
    allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.LEADER],
    children: [
      {
        path: "ventas-por-agente",
        routeKey: "reportesReporteVentasPorAgente",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "registros",
        routeKey: "reportesReporteDeRegistros",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.LEADER],
      },
      {
        path: "ventas-mensuales",
        routeKey: "reportesReporteVentalMensual",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.LEADER],
      },
      {
        path: "ventas-activas-por-cobrar",
        routeKey: "reportesReporteVentasActivasPorCobrar",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.LEADER],
      },
      {
        path: "ventas-potenciales",
        routeKey: "reportesReporteVentaPorAgentePotencial",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.LEADER],
      },
      {
        path: "control-finalizados",
        routeKey: "reporteReporteRecordFinalizado",
        allowedRoles: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        path: "ventas-globales",
        routeKey: "reportesReporteVentasGlobales",
        allowedRoles: [Roles.SUPER_ADMIN],
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
