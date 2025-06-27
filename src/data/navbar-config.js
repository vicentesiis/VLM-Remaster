import {
  BarChart,
  ClipboardList,
  ShieldCheck,
  CheckCircle,
  Globe,
  ShoppingCart,
  Users,
  UserCircle,
  Briefcase,
  ListChecks,
  PieChart,
  BookOpen,
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
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
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
        description: "Listado completo de todos los registros disponibles.",
        icon: BookOpen,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Mis Prospectos",
        to: "/registros/mis-prospectos",
        description: "Consulta los registros asignados a ti.",
        icon: UserCircle,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Mis Leads",
        to: "/registros/mis-leads",
        description: "Seguimiento de tus oportunidades activas.",
        icon: Briefcase,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Clientes",
        to: "/registros/clientes",
        description: "Consulta de clientes.",
        icon: Users,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Mis Clientes",
        to: "/registros/mis-clientes",
        description: "Tus clientes actuales y su historial.",
        icon: UserCircle,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Tareas",
        to: "/registros/tareas",
        description: "Tus tareas pendientes y asignaciones diarias.",
        icon: ListChecks,
        allowedRoutes: [Roles.AGENT, Roles.ADMIN],
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
        description: "Resumen de tu desempeño y ventas.",
        icon: PieChart,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Ventas por agente",
        to: "/reportes/ventas-por-agente",
        description: "Comparativa de ventas por cada agente.",
        icon: BarChart,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Registros por agente",
        to: "/reportes/registros",
        description: "Registros generados clasificados por agente.",
        icon: ClipboardList,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas mensuales",
        to: "/reportes/ventas-mensuales",
        description: "Reporte total de ventas mes a mes.",
        icon: ShoppingCart,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Auditoría de registros",
        to: "/reportes/auditoria-registros",
        description: "Audita y valida los registros generados.",
        icon: ShieldCheck,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Control de finalizados",
        to: "/reportes/control-finalizados",
        description: "Registros que han sido completados o cerrados.",
        icon: CheckCircle,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas globales",
        to: "/reportes/ventas-globales",
        description: "Visión general de ventas totales.",
        icon: Globe,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas por Canal",
        to: "/reportes/ventas-canal",
        description: "Desglose de ventas por canal utilizado.",
        icon: BarChart,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Cortes por Agente",
        to: "/reportes/cortes-agente",
        description: "Cortes de ventas realizadas por agente.",
        icon: ClipboardList,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
    ],
  },
]
