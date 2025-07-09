import {
  Briefcase,
  ShieldCheck,
  Globe,
  UserCheck,
  Handshake,
  CheckSquare,
  FileText,
  Users2,
  Contact,
  Target,
  DollarSign,
  UserCog,
  NotebookText,
  CalendarRange,
  CheckCircle2,
  Network,
  ReceiptText,
} from "lucide-react"
import { Roles } from "@/constants"

export const menuItems = [
  {
    title: "Mis Tareas",
    to: "/tareas",
    icon: CheckSquare,
    allowedRoutes: [Roles.ADMIN, Roles.AGENT],
  },
  {
    title: "Registros",
    to: "/registros/registros",
    icon: FileText,
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
  },
  {
    title: "Clientes",
    to: "/registros/clientes",
    icon: Users2,
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
  },
  {
    title: "Mis Leads",
    to: "/registros/mis-leads",
    icon: Contact,
    allowedRoutes: [Roles.AGENT],
  },
  {
    title: "Mis Clientes",
    to: "/registros/mis-clientes",
    icon: Handshake,
    allowedRoutes: [Roles.AGENT],
  },
  {
    title: "Mis Prospectos",
    to: "/registros/mis-prospectos",
    icon: Target,
    allowedRoutes: [Roles.AGENT],
  },
  {
    title: "Vacantes",
    to: "/vacantes",
    icon: Briefcase,
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
  },
  {
    title: "Ventas",
    to: "/reportes/ventas-por-agente",
    icon: DollarSign,
    allowedRoutes: [Roles.AGENT],
  },
  {
    title: "Usuarios",
    to: "/usuarios",
    icon: UserCog,
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.AGENT],
  },
]

export const dropdownMenus = [
  {
    title: "Reportes",
    allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
    items: [
      {
        title: "Ventas por agente",
        to: "/reportes/ventas-por-agente",
        icon: UserCheck,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Registros por agente",
        to: "/reportes/registros",
        icon: NotebookText,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas mensuales",
        to: "/reportes/ventas-mensuales",
        icon: CalendarRange,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas Potenciales",
        to: "/reportes/ventas-potenciales",
        icon: ShieldCheck,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Control de finalizados",
        to: "/reportes/control-finalizados",
        icon: CheckCircle2,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
      {
        title: "Ventas globales",
        to: "/reportes/ventas-globales",
        icon: Globe,
        allowedRoutes: [Roles.SUPER_ADMIN],
      },
      // {
      //   title: "Ventas por Canal",
      //   to: "/reportes/ventas-canal",
      //   icon: Network,
      //   allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      // },
      {
        title: "Cortes por Agente",
        to: "/reportes/cortes-agente",
        icon: ReceiptText,
        allowedRoutes: [Roles.SUPER_ADMIN, Roles.ADMIN],
      },
    ],
  },
]
