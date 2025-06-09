import {
  BarChart,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  CheckSquare,
  Globe,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Roles } from "@/constants/appConstants"

export const menuItems = [
  {
    title: "Vacantes",
    to: "/vacantes",
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
  },
  {
    title: "Ventas",
    to: "/ventas",
    allowedRoutes: [Roles.AGENT],
  },
  {
    title: "Usuarios",
    to: "/usuarios",
    allowedRoutes: [Roles.AGENT],
  },
]

export const dropdownMenus = [
  {
    title: "Registros",
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
    items: [
      {
        title: "Registros",
        to: "/registros/registros",
        description: "Consulta y gestiona los registros generados.",
        icon: FileText,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
      },
      {
        title: "Mis Registros",
        to: "/registros/mis-registros",
        description: "Consulta y gestiona tus registros generados.",
        icon: BarChart,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Clientes",
        to: "/registros/clientes",
        description: "Consulta y gestiona los clientes registrados.",
        icon: FileText,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Mis Clientes",
        to: "/registros/mis-clientes",
        description: "Consulta y gestiona tus clientes registrados.",
        icon: ShoppingCart,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Tareas",
        to: "/registros/tareas",
        description: "Consulta y gestiona tus tareas pendientes.",
        icon: ClipboardCheck,
        allowedRoutes: [Roles.ADMIN, Roles.AGENT],
      },
    ],
  },
  {
    title: "Reportes",
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
    items: [
      {
        title: "Reporte Personal",
        to: "/reportes/reporte-personal",
        description: "Consulta las ventas individuales de cada agente.",
        icon: BarChart,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Ventas por agente",
        to: "/reportes/ventas-por-agente",
        description: "Lista detallada de registros generados.",
        icon: BarChart,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Registros por agente",
        to: "/reportes/registros",
        description: "Lista detallada de registros generados.",
        icon: FileText,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas mensuales",
        to: "/reportes/ventas-mensuales",
        description: "Reporte de ventas totales por mes.",
        icon: ShoppingCart,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Auditoría de registros",
        to: "/reportes/auditoria-registros",
        description: "Revisión y validación de registros previos.",
        icon: ShieldCheck,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Control de finalizados",
        to: "/reportes/control-finalizados",
        description: "Seguimiento de registros y órdenes finalizadas.",
        icon: CheckSquare,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas globales",
        to: "/reportes/ventas-globales",
        description: "Resumen total de todas las ventas.",
        icon: Globe,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas por Canal",
        to: "/reportes/ventas-canal",
        description: "Reporte de ventas divididas por canal de venta.",
        icon: BarChart,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Cortes por Agente",
        to: "/reportes/cortes-agente",
        description: "Registro de cortes y cierres de ventas por agente.",
        icon: ClipboardCheck,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
    ],
  },
  {
    title: "Ajustes",
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
    items: [
      {
        title: "Usuarios",
        to: "/ajustes/usuarios",
        description: "Gestión y configuración de perfiles de usuario.",
        icon: Users,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Cuentas",
        to: "/ajustes/cuentas",
        description: "Administración de cuentas y permisos.",
        icon: FileText,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
    ],
  },
]
