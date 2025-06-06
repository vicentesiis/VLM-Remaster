export const routes = [
  {
    path: "/registros",
    routeKey: "registros",
    allowedRoles: ["super_admin", "admin", "agent"],
    children: [
      {
        path: "registros",
        routeKey: "registros",
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "mis-registros",
        routeKey: "misRegistros",
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "clientes",
        routeKey: "clientes",
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "clientes/:clientId",
        routeKey: "clientesDetail",
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "mis-clientes",
        routeKey: "misClientes",
        allowedRoles: ["super_admin", "admin", "agent"],
      },
      {
        path: "mis-tareas",
        routeKey: "misTareas",
        allowedRoles: ["super_admin", "admin", "agent"],
      },
    ],
  },
  {
    path: "/vacantes",
    routeKey: "vacantes",
    allowedRoles: ["super_admin", "admin", "agent"],
  },
  {
    path: "/reportes",
    routeKey: "reportes",
    allowedRoles: ["super_admin", "admin", "agent"],
    children: [
      {
        path: "reporte-personal",
        routeKey: "reportePersonal",
        allowedRoles: ["agent"],
      },
      {
        path: "ventas-por-agente",
        routeKey: "reportesReporteVentasPorAgente",
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "registros",
        routeKey: "reportesReporteDeRegistros",
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "ventas-mensuales",
        routeKey: "reportesReporteVentalMensual",
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "auditoria-registros",
        routeKey: "auditoriaDeRegistros",
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "control-finalizados",
        routeKey: "controlDeFinalizados",
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "ventas-globales",
        routeKey: "reportesReporteVentasGlobales",
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "ventas-canal",
        routeKey: "ventasPorCanal",
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "cortes-agente",
        routeKey: "cortesPorAgente",
        allowedRoles: ["super_admin", "admin"],
      },
    ],
  },
  {
    path: "/info",
    routeKey: "info",
    allowedRoles: ["agent"],
    children: [
      {
        path: "datos-del-proyecto",
        routeKey: "info",
        allowedRoles: ["agent"],
      },
      {
        path: "usuarios",
        routeKey: "usuariosInfo",
        allowedRoles: ["agent"],
      },
    ],
  },
  {
    path: "/ajustes",
    routeKey: "ajustes",
    allowedRoles: ["super_admin", "admin"],
    children: [
      {
        path: "usuarios",
        routeKey: "ajustesUsuarios",
        allowedRoles: ["super_admin", "admin"],
      },
      {
        path: "cuentas",
        routeKey: "cuentas",
        allowedRoles: ["super_admin", "admin"],
      },
    ],
  },
  {
    path: "/unauthorized",
    routeKey: "unauthorizedAccess",
  },
]

export default routes
