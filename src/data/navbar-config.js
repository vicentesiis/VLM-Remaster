import {
  Briefcase,
  ClipboardList,
  ShieldCheck,
  CheckCircle,
  Globe,
  Users,
  FileBarChart,
  TrendingUp,
  UserCheck,
  BarChart2,
  LineChart,
  UserSearch,
  Handshake,
  User,
  Receipt,
} from "lucide-react"
import { Roles } from "@/constants"

export const menuItems = [
  {
    title: "Mis Tareas",
    to: "/tareas",
    icon: ClipboardList,
    allowedRoutes: [Roles.ADMIN, Roles.AGENT],
  },
  {
    title: "Vacantes",
    to: "/vacantes",
    icon: Briefcase,
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
  },
  {
    title: "Ventas",
    to: "/ventas",
    icon: TrendingUp,
    allowedRoutes: [Roles.AGENT],
  },
  {
    title: "Usuarios",
    to: "/usuarios",
    icon: Users,
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
        icon: ClipboardList,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Mis Prospectos",
        to: "/registros/mis-prospectos",
        icon: UserSearch,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Mis Leads",
        to: "/registros/mis-leads",
        icon: User,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Clientes",
        to: "/registros/clientes",
        icon: UserCheck,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Mis Clientes",
        to: "/registros/mis-clientes",
        icon: Handshake,
        allowedRoutes: [Roles.AGENT],
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
        icon: FileBarChart,
        allowedRoutes: [Roles.AGENT],
      },
      {
        title: "Ventas por agente",
        to: "/reportes/ventas-por-agente",
        icon: BarChart2,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Registros por agente",
        to: "/reportes/registros",
        icon: ClipboardList,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas mensuales",
        to: "/reportes/ventas-mensuales",
        icon: LineChart,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Auditoría de registros",
        to: "/reportes/auditoria-registros",
        icon: ShieldCheck,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Control de finalizados",
        to: "/reportes/control-finalizados",
        icon: CheckCircle,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas globales",
        to: "/reportes/ventas-globales",
        icon: Globe,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas por Canal",
        to: "/reportes/ventas-canal",
        icon: BarChart2,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Cortes por Agente",
        to: "/reportes/cortes-agente",
        icon: Receipt,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
    ],
  },
]
