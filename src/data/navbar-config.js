import {
  BarChart,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  CheckSquare,
  Globe,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react"

export const menuItems = [
  { title: "Tareas", to: "/tareas", allowedRoutes: ["super_admin", "agent"] },
  {
    title: "Clientes",
    to: "/clientes",
    allowedRoutes: ["super_admin", "agent"],
  },
  { title: "Vacantes", to: "/vacantes", allowedRoutes: ["super_admin", "agent"] },
]

export const dropdownMenus = [
  {
    title: "Reportes",
    allowedRoutes: ["super_admin", "agent"],
    items: [
      {
        title: "Reporte Personal",
        to: "/reportes/reporte-personal",
        description: "Consulta las ventas individuales de cada agente.",
        icon: BarChart,
        allowedRoutes: ["agent"],
      },
      {
        title: "Ventas por agente",
        to: "/reportes/ventas-por-agente",
        description: "Lista detallada de registros generados.",
        icon: FileText,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Registros por agente",
        to: "/reportes/registros",
        description: "Lista detallada de registros generados.",
        icon: FileText,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Ventas mensuales",
        to: "/reportes/ventas-mensuales",
        description: "Reporte de ventas totales por mes.",
        icon: ShoppingCart,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Auditoría de registros",
        to: "/reportes/auditoria-registros",
        description: "Revisión y validación de registros previos.",
        icon: ShieldCheck,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Control de finalizados",
        to: "/reportes/control-finalizados",
        description: "Seguimiento de tareas y órdenes finalizadas.",
        icon: CheckSquare,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Ventas globales",
        to: "/reportes/ventas-globales",
        description: "Resumen total de todas las ventas.",
        icon: Globe,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Ventas por Canal",
        to: "/reportes/ventas-canal",
        description: "Reporte de ventas divididas por canal de venta.",
        icon: BarChart,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Cortes por Agente",
        to: "/reportes/cortes-agente",
        description: "Registro de cortes y cierres de ventas por agente.",
        icon: ClipboardCheck,
        allowedRoutes: ["super_admin"],
      },
    ],
  },
  {
    title: "Ajustes",
    allowedRoutes: ["super_admin"],
    items: [
      {
        title: "Ajustes de sistema",
        to: "/ajustes/sistema",
        description: "Configuraciones generales del sistema.",
        icon: Settings,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Usuario",
        to: "/ajustes/usuario",
        description: "Gestión y configuración de perfiles de usuario.",
        icon: Users,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Cuentas",
        to: "/ajustes/cuentas",
        description: "Administración de cuentas y permisos.",
        icon: FileText,
        allowedRoutes: ["super_admin"],
      },
      {
        title: "Vacantes",
        to: "/ajustes/vacantes",
        description: "Gestión y publicación de nuevas vacantes.",
        icon: ClipboardCheck,
        allowedRoutes: ["super_admin"],
      },
    ],
  },
  {
    title: "Info",
    allowedRoutes: ["agent"],
    items: [
      {
        title: "Datos del proyecto",
        to: "/info/datos-del-proyecto",
        description: "Información general sobre el proyecto.",
        icon: Globe,
        allowedRoutes: ["agent"],
      },
      {
        title: "Usuarios",
        to: "/info/usuarios",
        description: "Gestión y configuración de usuarios.",
        icon: Users,
        allowedRoutes: ["agent"],
      },
      {
        title: "Vacantes",
        to: "/info/vacantes",
        description: "Información sobre vacantes disponibles.",
        icon: ClipboardCheck,
        allowedRoutes: ["agent"],
      },
    ],
  },
]
